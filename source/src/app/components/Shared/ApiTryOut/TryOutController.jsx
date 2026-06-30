/*
 * Copyright (c) 2020, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, {
    useEffect, useState,
} from 'react';
import { styled } from '@mui/material/styles';
import { FormattedMessage } from 'react-intl';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import {
    Radio, RadioGroup, FormControlLabel, FormControl, CircularProgress,
    Dialog, DialogTitle, DialogContent, DialogActions,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Icon from '@mui/material/Icon';
import AuthManager from 'AppData/AuthManager';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import AdvertiseDetailsPanel from 'AppComponents/Shared/ApiTryOut/AdvertiseDetailsPanel';
import Progress from '../Progress';
import Api from '../../../data/api';
import Application from '../../../data/Application';
import CONSTANTS from '../../../data/Constants';
import SelectAppPanel from './SelectAppPanel';
import { isMultipleClientSecretsEnabled } from 'AppComponents/Shared/AppsAndKeys/Secrets/util';
import Alert from 'AppComponents/Shared/Alert';
import isPlatformGatewayApi from '../../Apis/Details/ApiConsole/platformGateway';

/* ── LOOP Matrix design tokens ── */
const ORANGE = '#FF5F00';
const panelBg = '#080808';
const border = 'rgba(255,255,255,0.12)';
const muted = '#9CA3AF';
const textColor = '#E5E7EB';
const pop = "'Poppins', sans-serif";

/* ── shared sx helpers ── */
const labelSx = {
    display: 'block',
    fontFamily: pop,
    fontSize: 13,
    fontWeight: 500,
    color: muted,
    mb: '6px',
};

const fieldSx = {
    width: '100%',
    '& .MuiOutlinedInput-root': {
        background: panelBg,
        color: textColor,
        borderRadius: '8px',
        minHeight: 48,
        fontFamily: pop,
        fontSize: 14,
    },
    '& .MuiOutlinedInput-notchedOutline': { borderColor: border },
    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.25)' },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: ORANGE },
    '& .MuiOutlinedInput-notchedOutline legend': { width: 0, maxWidth: 0, padding: 0 },
    '& .MuiInputLabel-root': { display: 'none' },
    '& .MuiSelect-icon': { color: muted },
    '& .MuiInputAdornment-root': { color: muted },
    '& .MuiFormHelperText-root': { display: 'none' },
};

const radioSx = { color: '#4B5563', '&.Mui-checked': { color: ORANGE } };

const warnBoxSx = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 1.5,
    background: 'rgba(245,158,11,0.08)',
    border: '1px solid rgba(180,83,9,0.5)',
    borderRadius: '8px',
    padding: '12px 16px',
    mb: 3,
};

/* Keep Root so AdvertiseDetailsPanel still gets `classes` correctly */
const PREFIX = 'TryOutController';
const classes = {
    centerItems: `${PREFIX}-centerItems`,
    tokenType: `${PREFIX}-tokenType`,
    paper: `${PREFIX}-paper`,
    grid: `${PREFIX}-grid`,
    tryoutHeading: `${PREFIX}-tryoutHeading`,
    genKeyButton: `${PREFIX}-genKeyButton`,
    gatewayEnvironment: `${PREFIX}-gatewayEnvironment`,
    categoryHeading: `${PREFIX}-categoryHeading`,
    tooltip: `${PREFIX}-tooltip`,
    menuItem: `${PREFIX}-menuItem`,
    warningIcon: `${PREFIX}-warningIcon`,
    loadMoreLink: `${PREFIX}-loadMoreLink`,
    link: `${PREFIX}-link`,
    authHeader: `${PREFIX}-authHeader`,
};
const Root = styled('div')(() => ({ width: '100%' }));

function TryOutController(props) {
    const {
        securitySchemeType, selectedEnvironment, environments,
        productionAccessToken, sandboxAccessToken, selectedKeyType, setKeys, setSelectedKeyType, setSelectedKeyManager,
        setSelectedEnvironment, setProductionAccessToken, setSandboxAccessToken, scopes, setSecurityScheme, setUsername,
        setPassword, username, password, updateSwagger, setProductionApiKey, setSandboxApiKey, productionApiKey,
        sandboxApiKey, environmentObject, setURLs, setAdvAuthHeader, setAdvAuthHeaderValue, advAuthHeader,
        advAuthHeaderValue, setSelectedEndpoint, selectedEndpoint, api, URLs, onConfigChange,
    } = props;
    let { selectedKeyManager } = props;
    selectedKeyManager = selectedKeyManager || 'Resident Key Manager';

    const [showToken, setShowToken] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const [subscriptions, setSubscriptions] = useState([]);
    const [allApplications, setAllApplications] = useState(null);
    const [selectedApplication, setSelectedApplication] = useState([]);
    const [keyManagers, setKeyManagers] = useState([]);
    const [selectedKMObject, setSelectedKMObject] = useState(null);
    const [ksGenerated, setKSGenerated] = useState(false);
    const [showMoreGWUrls, setShowMoreGWUrls] = useState(false);
    const [tokenValue, setTokenValue] = useState('');
    const [consumerSecret, setConsumerSecret] = useState('');
    const [showSecret, setShowSecret] = useState(false);
    const [secretDialogOpen, setSecretDialogOpen] = useState(false);
    const apiID = api.id;
    const restApi = new Api();
    const user = AuthManager.getUser();
    const isPlatformGateway = isPlatformGatewayApi(api);
    const isSubValidationDisabled = api.tiers && api.tiers.length === 1
            && api.tiers[0].tierName.includes(CONSTANTS.DEFAULT_SUBSCRIPTIONLESS_PLAN);

    const handleAccessTokenChange = ({ newAccessToken }) => {
        if (onConfigChange) {
            onConfigChange({
                newAccessToken,
                newSecurityScheme: securitySchemeType,
                newUsername: username,
                newPassword: password,
                newSelectedEnvironment: selectedEnvironment,
            });
        }
    };

    useEffect(() => {
        let subscriptionsList;
        let appList;
        let newSelectedApplication;
        let keys;
        let selectedKeyTypes = 'PRODUCTION';
        let accessToken;
        if (api.lifeCycleStatus) {
            if (isSubValidationDisabled) {
                const promiseAllApplications = Application.all(100, 0, 'asc', 'name', '');
                promiseAllApplications.then((appResponse) => {
                    if (appResponse !== null) {
                        appList = appResponse.list.filter((app) => app.status === 'APPROVED');
                        if (appList && appList.length > 0) {
                            newSelectedApplication = appList[0].applicationId;
                            Application.get(newSelectedApplication)
                                .then((application) => application.getKeys())
                                .then((appKeys) => {
                                    if (appKeys.get(selectedKeyManager)
                                        && appKeys.get(selectedKeyManager).keyType === 'SANDBOX') {
                                        selectedKeyTypes = 'SANDBOX';
                                        ({ accessToken } = appKeys.get(selectedKeyManager).token);
                                    } else if (appKeys.get(selectedKeyManager)
                                        && appKeys.get(selectedKeyManager).keyType === 'PRODUCTION') {
                                        selectedKeyTypes = 'PRODUCTION';
                                        ({ accessToken } = appKeys.get(selectedKeyManager).token);
                                    }
                                    setSelectedApplication(newSelectedApplication);
                                    setAllApplications(appList);
                                    setKeys(appKeys);
                                    setSelectedEnvironment(selectedEnvironment, false);
                                    setSelectedKeyType(selectedKeyTypes, false);
                                    if (selectedKeyType === 'PRODUCTION') {
                                        setProductionAccessToken(accessToken);
                                    } else {
                                        setSandboxAccessToken(accessToken);
                                    }
                                });
                        }
                    }
                }).catch((error) => {
                    if (process.env.NODE_ENV !== 'production') { console.error(error); }
                    const { status } = error;
                    if (status === 404) { setNotFound(true); }
                });
            }
            const promiseSubscriptions = restApi.getSubscriptions(apiID);
            promiseSubscriptions.then((subscriptionsResponse) => {
                if (subscriptionsResponse !== null) {
                    subscriptionsList = subscriptionsResponse.obj.list.filter((item) => item.status === 'UNBLOCKED'
                        || item.status === 'PROD_ONLY_BLOCKED' || item.status === 'TIER_UPDATE_PENDING');

                    if (subscriptionsList && subscriptionsList.length > 0) {
                        newSelectedApplication = subscriptionsList[0].applicationId;
                        Application.get(newSelectedApplication)
                            .then((application) => application.getKeys())
                            .then((appKeys) => {
                                if (appKeys.get(selectedKeyManager)
                                    && appKeys.get(selectedKeyManager).keyType === 'SANDBOX') {
                                    selectedKeyTypes = 'SANDBOX';
                                    ({ accessToken } = appKeys.get(selectedKeyManager).token);
                                } else if (appKeys.get(selectedKeyManager)
                                    && appKeys.get(selectedKeyManager).keyType === 'PRODUCTION') {
                                    selectedKeyTypes = 'PRODUCTION';
                                    ({ accessToken } = appKeys.get(selectedKeyManager).token);
                                }
                                setSelectedApplication(newSelectedApplication);
                                setSubscriptions(subscriptionsList);
                                setKeys(appKeys);
                                setSelectedEnvironment(selectedEnvironment, false);
                                setSelectedKeyType(selectedKeyTypes, false);
                                if (selectedKeyType === 'PRODUCTION') {
                                    setProductionAccessToken(accessToken);
                                } else {
                                    setSandboxAccessToken(accessToken);
                                }
                            });
                    } else {
                        setSelectedApplication(newSelectedApplication);
                        setSubscriptions(subscriptionsList);
                        setKeys(keys);
                        setSelectedEnvironment(selectedEnvironment, false);
                        if (selectedKeyType === 'PRODUCTION') {
                            setProductionAccessToken(accessToken);
                        } else {
                            setSandboxAccessToken(accessToken);
                        }
                        setSelectedKeyType(selectedKeyType, false);
                    }
                } else {
                    setSelectedApplication(newSelectedApplication);
                    setSubscriptions(subscriptionsList);
                    setKeys(keys);
                    setSelectedEnvironment(selectedEnvironment, false);
                    if (selectedKeyType === 'PRODUCTION') {
                        setProductionAccessToken(accessToken);
                    } else {
                        setSandboxAccessToken(accessToken);
                    }
                    setSelectedKeyType(selectedKeyType, false);
                }
            }).catch((error) => {
                if (process.env.NODE_ENV !== 'production') { console.error(error); }
                const { status } = error;
                if (status === 404) { setNotFound(true); }
            });
            const promisedKeyManagers = restApi.getKeyManagers();
            promisedKeyManagers
                .then((response) => {
                    const responseKeyManagerList = [];
                    response.body.list.map((item) => responseKeyManagerList.push(item));
                    setKeyManagers(responseKeyManagerList);
                    const filteredKMs = (responseKeyManagerList.filter((km) => km.name === selectedKeyManager));
                    if (filteredKMs && filteredKMs.length > 0) {
                        setSelectedKMObject(filteredKMs[0]);
                    }
                })
                .catch((error) => {
                    if (process.env.NODE_ENV !== 'production') { console.log(error); }
                    const { status } = error;
                    if (status === 404) { setNotFound(true); }
                });
        }
    }, []);

    function generateAccessToken(secretOverride) {
        const secret = (typeof secretOverride === 'string') ? secretOverride : consumerSecret;
        if (api.lifeCycleStatus) {
            setIsUpdating(true);
            const applicationPromise = Application.get(selectedApplication);
            applicationPromise
                .then((application) => application.generateToken(
                    selectedKeyManager,
                    selectedKeyType,
                    3600,
                    scopes,
                    undefined,
                    undefined,
                    secret,
                ))
                .then((response) => {
                    console.log('token generated successfully ' + response);
                    setShowToken(false);
                    if (selectedKeyType === 'PRODUCTION') {
                        setProductionAccessToken(response.accessToken);
                    } else {
                        setSandboxAccessToken(response.accessToken);
                    }
                    handleAccessTokenChange({ newAccessToken: response.accessToken });
                    setIsUpdating(false);
                })
                .catch((error) => {
                    console.error(error);
                    const { status } = error;
                    if (status === 404) { setNotFound(true); }
                    setIsUpdating(false);
                    const { response } = error;
                    if (response && response.body && response.body.message && response.body.description) {
                        Alert.error(`${response.body.message}: ${response.body.description}`);
                    }
                });
        }
    }

    function generateApiKey() {
        if (api.lifeCycleStatus) {
            setIsUpdating(true);
            const promisedKey = restApi.generateApiKey(selectedApplication, selectedKeyType, -1);
            promisedKey
                .then((response) => {
                    console.log('Non empty response received', response);
                    setShowToken(false);
                    if (selectedKeyType === 'PRODUCTION') {
                        setProductionApiKey(response.body.apikey);
                    } else {
                        setSandboxApiKey(response.body.apikey);
                    }
                    handleAccessTokenChange({ newAccessToken: response.body.apikey });
                    setIsUpdating(false);
                })
                .catch((error) => {
                    console.log(error);
                    const { status } = error;
                    if (status === 404) { setNotFound(true); }
                    setIsUpdating(false);
                });
        }
    }

    function handleClickShowToken() {
        setShowToken(!showToken);
    }

    function updateApplication() {
        if (api.lifeCycleStatus) {
            if (selectedApplication == null || String(selectedApplication).trim() === '') {
                return;
            }
            let accessToken;
            let keyType;
            if (isSubValidationDisabled) {
                if (allApplications !== null && allApplications.length !== 0 && selectedApplication.length !== 0) {
                    if (allApplications.find((app) => app.applicationId
                        === selectedApplication).status === 'PROD_ONLY_BLOCKED') {
                        setSelectedKeyType(selectedKeyType, false);
                        keyType = 'SANDBOX';
                    } else {
                        keyType = selectedKeyType;
                    }
                }
            } else if (subscriptions !== null && subscriptions.length !== 0 && selectedApplication.length !== 0) {
                if (subscriptions.find((sub) => sub.applicationId
                    === selectedApplication).status === 'PROD_ONLY_BLOCKED') {
                    setSelectedKeyType(selectedKeyType, false);
                    keyType = 'SANDBOX';
                } else {
                    keyType = selectedKeyType;
                }
            }
            Application.get(selectedApplication)
                .then((application) => application.getKeys(keyType || 'PRODUCTION'))
                .then((appKeys) => {
                    const selectedKeys = appKeys.get(selectedKeyManager);
                    if (selectedKeys && selectedKeys.keyType === selectedKeyType) {
                        ({ accessToken } = selectedKeys.token);
                    }
                    if (selectedKeys && selectedKeys.keyType === 'PRODUCTION') {
                        setProductionAccessToken(accessToken);
                    } else if (selectedKeys && selectedKeys.keyType === 'SANDBOX') {
                        setSandboxAccessToken(accessToken);
                    }
                    if (selectedKeys && selectedKeys.consumerKey && selectedKeys.consumerKey !== '') {
                        setKSGenerated(true);
                    } else {
                        setKSGenerated(false);
                    }
                    setKeys(appKeys);
                })
                .catch((err) => {
                    if (process.env.NODE_ENV !== 'production') {
                        console.warn('TryOutController: could not load application keys', err);
                    }
                    setKeys([]);
                    setProductionAccessToken('');
                    setSandboxAccessToken('');
                    setProductionApiKey('');
                    setSandboxApiKey('');
                    setKSGenerated(false);
                    setConsumerSecret('');
                    setShowToken(false);
                    handleAccessTokenChange({ newAccessToken: '' });
                });
        }
    }

    useEffect(() => {
        updateApplication();
    }, [selectedApplication, selectedKeyType, selectedEnvironment, securitySchemeType]);

    useEffect(() => {
        if (onConfigChange) {
            onConfigChange({
                newAccessToken: null,
                newSecurityScheme: securitySchemeType,
                newUsername: username,
                newPassword: password,
                newSelectedEnvironment: selectedEnvironment,
            });
        }
    }, [username, password, selectedEnvironment, securitySchemeType]);

    function handleChanges(event) {
        const { target } = event;
        const { name, value } = target;
        switch (name) {
            case 'selectedEnvironment':
                setSelectedEnvironment(value, true);
                if (api.type !== 'GRAPHQL' && api.type !== 'WS' && api.type !== 'SSE' && api.type !== 'WEBSUB') {
                    updateSwagger(value);
                }
                if (environmentObject) {
                    const urls = environmentObject.find((elm) => value === elm.environmentName).URLs;
                    setURLs(urls);
                }
                break;
            case 'selectedApplication':
                setProductionAccessToken('');
                setSandboxAccessToken('');
                setProductionApiKey('');
                setSandboxApiKey('');
                setSelectedApplication(value);
                setConsumerSecret('');
                break;
            case 'selectedKeyManager':
                setSelectedKeyManager(value, true, selectedApplication);
                setConsumerSecret('');
                break;
            case 'selectedKeyType':
                if (!productionAccessToken || !sandboxAccessToken) {
                    setSelectedKeyType(value, true, selectedApplication);
                } else {
                    setSelectedKeyType(value, false, selectedApplication);
                }
                break;
            case 'securityScheme':
                setSecurityScheme(value);
                break;
            case 'username':
                setUsername(value);
                break;
            case 'password':
                setPassword(value);
                break;
            case 'accessToken':
                handleAccessTokenChange({ newAccessToken: value });
                if (securitySchemeType === 'API-KEY' && selectedKeyType === 'PRODUCTION') {
                    setProductionApiKey(value);
                } else if (securitySchemeType === 'API-KEY' && selectedKeyType === 'SANDBOX') {
                    setSandboxApiKey(value);
                } else if (selectedKeyType === 'PRODUCTION') {
                    setProductionAccessToken(value);
                } else {
                    setSandboxAccessToken(value);
                }
                break;
            case 'advAuthHeader':
                setAdvAuthHeader(value);
                break;
            case 'advAuthHeaderValue':
                setAdvAuthHeaderValue(value);
                break;
            case 'selectedEndpoint':
                setSelectedEndpoint(value);
                break;
            case 'consumerSecret':
                setConsumerSecret(value);
                break;
            default:
        }
    }

    if (api == null) { return <Progress />; }
    if (notFound) { return 'API Not found !'; }

    let isApiKeyEnabled = false;
    let isBasicAuthEnabled = false;
    let isOAuthEnabled = false;
    let isTestKeyEnabled = false;
    let authorizationHeader = api.authorizationHeader ? api.authorizationHeader : 'Authorization';
    let prefix = 'Bearer';
    if (api && api.securityScheme) {
        const securitySchemeValues = Array.isArray(api.securityScheme)
            ? api.securityScheme
            : (typeof api.securityScheme === 'string'
                ? api.securityScheme.split(',')
                : [api.securityScheme]);
        const securitySchemes = new Set(
            securitySchemeValues.map((s) => String(s).trim().toLowerCase()).filter(Boolean),
        );
        isApiKeyEnabled = securitySchemes.has('api_key');
        isBasicAuthEnabled = securitySchemes.has('basic_auth');
        isOAuthEnabled = securitySchemes.has('oauth2');
        isTestKeyEnabled = securitySchemes.has('test_auth');
        if (isPlatformGateway) {
            isApiKeyEnabled = isApiKeyEnabled && !!api.apiKeyHeader;
            isOAuthEnabled = isOAuthEnabled && !!api.authorizationHeader;
        }
        if (isApiKeyEnabled && securitySchemeType === 'API-KEY') {
            authorizationHeader = api.apiKeyHeader ? api.apiKeyHeader : 'ApiKey';
            prefix = '';
        }
        if (isTestKeyEnabled && securitySchemeType === 'TEST') {
            authorizationHeader = 'testKey';
            prefix = '';
        }
    }
    const lifeCycleStatus = (api.lifeCycleStatus || '').toLowerCase();
    const isPrototypedAPI = lifeCycleStatus === 'prototyped';
    const isPublished = lifeCycleStatus === 'published';
    const showSecurityType = isPublished || isPrototypedAPI;
    let selectedSchemeEnabled = false;
    if (securitySchemeType === 'API-KEY') {
        selectedSchemeEnabled = isApiKeyEnabled;
    } else if (securitySchemeType === 'BASIC') {
        selectedSchemeEnabled = isBasicAuthEnabled;
    } else if (securitySchemeType === 'TEST') {
        selectedSchemeEnabled = isTestKeyEnabled;
    } else {
        selectedSchemeEnabled = isOAuthEnabled;
    }

    const authHeader = `${authorizationHeader}: ${prefix}`;
    const isMultipleClientSecretsAllowed = isMultipleClientSecretsEnabled(selectedKMObject?.additionalProperties);
    const isConsumerSecretRequired = selectedKMObject
        && (isMultipleClientSecretsAllowed || selectedKMObject.enableTokenHashing)
        && securitySchemeType === 'OAUTH';

    useEffect(() => {
        if (securitySchemeType === 'API-KEY') {
            setTokenValue(selectedKeyType === 'PRODUCTION' ? productionApiKey : sandboxApiKey);
        } else {
            setTokenValue(selectedKeyType === 'PRODUCTION' ? productionAccessToken : sandboxAccessToken);
        }
    }, [securitySchemeType, selectedKeyType, productionAccessToken, sandboxAccessToken, productionApiKey, sandboxApiKey]);

    const isWso2Gateway = !api.advertiseInfo || !api.advertiseInfo.advertised;
    const isWso2Vendor = api.gatewayVendor === 'wso2' || !api.gatewayVendor;

    /* ── shared dark dropdown portal styling ── */
    const menuItemSx = {
        fontFamily: pop,
        color: textColor,
        background: '#141A21',
        '&:hover': { background: '#1F2937' },
        '&.Mui-selected': { background: '#1F2937' },
        '&.Mui-selected:hover': { background: '#374151' },
    };

    const darkMenuProps = {
        PaperProps: {
            sx: {
                background: '#141A21',
                border: `1px solid ${border}`,
                borderRadius: '8px',
                mt: '4px',
                '& .MuiMenuItem-root': {
                    fontFamily: pop,
                    color: textColor,
                    fontSize: 14,
                    '&:hover': { background: '#1F2937' },
                    '&.Mui-selected': { background: '#1F2937' },
                    '&.Mui-selected:hover': { background: '#374151' },
                },
            },
        },
    };

    return (
        <Root>
            <Box sx={{ width: '100%', color: textColor, fontFamily: pop }}>

                {/* ── Key Manager warning ── */}
                {securitySchemeType !== 'TEST' && isWso2Gateway && isWso2Vendor && (
                    <>
                        {(keyManagers.length > 1 && selectedKMObject && selectedKMObject.enabled) && (
                            <Box sx={{ ...warnBoxSx, background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.3)' }}>
                                <Typography sx={{ fontFamily: pop, fontSize: 13, color: '#93C5FD' }}>
                                    <FormattedMessage
                                        id='Apis.Details.ApiConsole.TryOutController.default.km.msg.one'
                                        defaultMessage='The Resident Key Manager is selected for try out console.'
                                    />
                                </Typography>
                            </Box>
                        )}
                        {selectedKMObject && !selectedKMObject.enabled && (
                            <Box sx={warnBoxSx}>
                                <Typography sx={{ fontFamily: pop, fontSize: 13, color: '#FCD34D' }}>
                                    <FormattedMessage
                                        id='Apis.Details.ApiConsole.TryOutController.default.km.msg.two'
                                        defaultMessage={'Try it console is only accessible via the default key manager.'
                                            + 'But the default key manager is disabled at the moment.'}
                                    />
                                </Typography>
                            </Box>
                        )}
                        {selectedKMObject && selectedKMObject.length === 0 && (
                            <Box sx={warnBoxSx}>
                                <Typography sx={{ fontFamily: pop, fontSize: 13, color: '#FCD34D' }}>
                                    <FormattedMessage
                                        id='Apis.Details.ApiConsole.TryOutController.default.km.msg.three'
                                        defaultMessage={'Try it console is only accessible via the default key manager.'
                                            + 'Something went wrong while selecting the default Key manager.'}
                                    />
                                </Typography>
                            </Box>
                        )}
                    </>
                )}

                {/* ── Security Type radios ── */}
                {(isApiKeyEnabled || isBasicAuthEnabled || isOAuthEnabled) && showSecurityType
                    && isWso2Gateway && isWso2Vendor && (
                    <Box sx={{ mb: 3 }}>
                        <Box component='span' sx={{ ...labelSx, display: 'block' }} id='security-type'>
                            Security Type
                        </Box>
                        <FormControl variant='standard' component='fieldset'>
                            <RadioGroup
                                name='securityScheme'
                                value={securitySchemeType}
                                onChange={handleChanges}
                                aria-labelledby='security-type'
                                row
                                sx={{ background: panelBg, borderRadius: '7px', padding: '12px 16px', gap: 2 }}
                            >
                                <FormControlLabel
                                    value='OAUTH'
                                    disabled={!isOAuthEnabled}
                                    control={<Radio sx={radioSx} />}
                                    label={<span style={{ fontFamily: pop, fontSize: 14, color: muted }}>OAuth</span>}
                                />
                                <FormControlLabel
                                    value='API-KEY'
                                    disabled={!isApiKeyEnabled}
                                    control={<Radio sx={radioSx} />}
                                    id='api-key-select-radio-button'
                                    label={<span style={{ fontFamily: pop, fontSize: 14, color: muted }}>API Key</span>}
                                />
                                <FormControlLabel
                                    value='BASIC'
                                    disabled={!isBasicAuthEnabled}
                                    control={<Radio sx={radioSx} />}
                                    label={<span style={{ fontFamily: pop, fontSize: 14, color: muted }}>Basic</span>}
                                />
                            </RadioGroup>
                        </FormControl>
                    </Box>
                )}

                {/* ── Application + Key Type (SelectAppPanel) ── */}
                {user && subscriptions
                    && ((isSubValidationDisabled && allApplications !== null)
                        || (subscriptions.length > 0 && !isSubValidationDisabled))
                    && securitySchemeType !== 'BASIC' && securitySchemeType !== 'TEST'
                    && isWso2Gateway && isWso2Vendor && (
                    <SelectAppPanel
                        subscriptions={subscriptions}
                        allApplications={allApplications}
                        handleChanges={handleChanges}
                        selectedApplication={selectedApplication}
                        selectedKeyManager={selectedKeyManager}
                        selectedKeyType={selectedKeyType}
                        keyManagers={keyManagers}
                    />
                )}

                {/* ── No subscription warning ── */}
                {subscriptions && subscriptions.length === 0
                    && securitySchemeType !== 'TEST' && securitySchemeType !== 'BASIC'
                    && isWso2Vendor && isWso2Gateway
                    && !isSubValidationDisabled && !isPlatformGateway && (
                    <Box sx={warnBoxSx}>
                        <Typography sx={{ fontFamily: pop, fontSize: 13, color: '#FCD34D' }}>
                            <FormattedMessage
                                id='Apis.Details.ApiConsole.ApiConsole.subscribe.to.application'
                                defaultMessage='Please subscribe to an application'
                            />
                        </Typography>
                    </Box>
                )}

                {/* ── No keys warning ── */}
                {!ksGenerated && securitySchemeType === 'OAUTH'
                    && isWso2Gateway && isWso2Vendor
                    && !isPlatformGateway
                    && subscriptions && subscriptions.length > 0 && (
                    <Box sx={warnBoxSx}>
                        <Typography sx={{ fontFamily: pop, fontSize: 13, color: '#FCD34D' }}>
                            <FormattedMessage
                                id='Apis.Details.ApiConsole.ApiConsole.keys.not.generated'
                                defaultMessage={'Consumer key and secret not generated for the selected'
                                    + ' application on the {what} environment. '}
                                values={{ what: selectedKeyType }}
                            />
                        </Typography>
                    </Box>
                )}

                {/* ── Consumer Secret Dialog ── */}
                {isConsumerSecretRequired && (
                    <Dialog
                        open={secretDialogOpen}
                        onClose={() => { setSecretDialogOpen(false); setConsumerSecret(''); setShowSecret(false); }}
                        fullWidth
                        maxWidth='sm'
                        PaperProps={{
                            sx: {
                                background: '#141A21',
                                border: `1px solid ${border}`,
                                borderRadius: '12px',
                            },
                        }}
                    >
                        <DialogTitle sx={{ fontFamily: pop, color: textColor, borderBottom: `1px solid ${border}`, pb: 2 }}>
                            <FormattedMessage
                                id='Apis.Details.ApiConsole.generate.test.key.dialog.title'
                                defaultMessage='Generate test key'
                            />
                        </DialogTitle>
                        <DialogContent sx={{ pt: 3 }}>
                            <Box component='span' sx={labelSx}>Consumer secret</Box>
                            <TextField
                                autoFocus
                                fullWidth
                                margin='none'
                                variant='outlined'
                                name='consumerSecret'
                                onChange={handleChanges}
                                type={showSecret ? 'text' : 'password'}
                                value={consumerSecret || ''}
                                id='consumerSecretInput'
                                sx={fieldSx}
                                InputProps={{
                                    autoComplete: 'new-password',
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <IconButton
                                                edge='end'
                                                aria-label='toggle consumer secret visibility'
                                                onClick={() => setShowSecret(!showSecret)}
                                                size='large'
                                                sx={{ color: muted }}
                                            >
                                                {showSecret ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </DialogContent>
                        <DialogActions sx={{ borderTop: `1px solid ${border}`, px: 3, py: 2, gap: 1 }}>
                            <Button
                                onClick={() => { setSecretDialogOpen(false); setConsumerSecret(''); setShowSecret(false); }}
                                sx={{
                                    fontFamily: pop,
                                    color: muted,
                                    border: `1px solid ${border}`,
                                    borderRadius: '8px',
                                    px: 3,
                                    '&:hover': { borderColor: 'rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.04)' },
                                }}
                            >
                                <FormattedMessage
                                    id='Apis.Details.ApiConsole.generate.test.key.dialog.cancel'
                                    defaultMessage='Cancel'
                                />
                            </Button>
                            <Button
                                variant='contained'
                                onClick={() => {
                                    const secretValue = consumerSecret;
                                    setSecretDialogOpen(false);
                                    setConsumerSecret('');
                                    setShowSecret(false);
                                    generateAccessToken(secretValue);
                                }}
                                disabled={!consumerSecret?.trim() || isUpdating}
                                sx={{
                                    fontFamily: pop,
                                    background: ORANGE,
                                    color: '#fff',
                                    borderRadius: '8px',
                                    px: 3,
                                    '&:hover': { background: '#E65500' },
                                    '&:disabled': { background: 'rgba(255,95,0,0.3)', color: 'rgba(255,255,255,0.4)' },
                                }}
                            >
                                <FormattedMessage
                                    id='Apis.Details.ApiConsole.generate.test.key.dialog.generate'
                                    defaultMessage='Generate'
                                />
                            </Button>
                        </DialogActions>
                    </Dialog>
                )}

                {/* ── Main token / auth area ── */}
                {isWso2Gateway && isWso2Vendor ? (
                    <Box>
                        {/* Basic auth: username + password */}
                        {securitySchemeType === 'BASIC' && (
                            <Box sx={{ mb: 3 }}>
                                <Box sx={{ mb: 3 }}>
                                    <Box component='span' sx={labelSx}>Username</Box>
                                    <TextField
                                        variant='outlined'
                                        id='username'
                                        name='username'
                                        onChange={handleChanges}
                                        value={username || ''}
                                        fullWidth
                                        margin='none'
                                        sx={fieldSx}
                                    />
                                </Box>
                                <Box>
                                    <Box component='span' sx={labelSx}>Password</Box>
                                    <TextField
                                        variant='outlined'
                                        id='input-password'
                                        name='password'
                                        onChange={handleChanges}
                                        type={showPassword ? 'text' : 'password'}
                                        value={password || ''}
                                        fullWidth
                                        margin='none'
                                        sx={fieldSx}
                                        InputProps={{
                                            autoComplete: 'new-password',
                                            endAdornment: (
                                                <InputAdornment position='end'>
                                                    <IconButton
                                                        edge='end'
                                                        aria-label='toggle password visibility'
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        size='large'
                                                        sx={{ color: muted }}
                                                    >
                                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Box>
                            </Box>
                        )}

                        {/* Access Token row + GET TEST KEY */}
                        {securitySchemeType !== 'BASIC' && securitySchemeType !== 'TEST' && selectedSchemeEnabled && (
                            <Box sx={{ mb: 3 }}>
                                <Box component='span' sx={labelSx}>Access Token</Box>
                                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                    <TextField
                                        fullWidth
                                        variant='outlined'
                                        name='accessToken'
                                        onChange={handleChanges}
                                        type={showToken ? 'text' : 'password'}
                                        value={tokenValue || ''}
                                        id='accessTokenInput'
                                        margin='none'
                                        sx={fieldSx}
                                        InputProps={{
                                            autoComplete: 'new-password',
                                            endAdornment: (
                                                <InputAdornment position='end'>
                                                    <IconButton
                                                        edge='end'
                                                        aria-label='Toggle token visibility'
                                                        onClick={handleClickShowToken}
                                                        size='large'
                                                        sx={{ color: muted }}
                                                    >
                                                        {showToken ? <Icon>visibility_off</Icon> : <Icon>visibility</Icon>}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                            startAdornment: (
                                                <InputAdornment
                                                    position='start'
                                                    sx={{ minWidth: authHeader.length * 7, color: muted, fontFamily: pop, fontSize: 13 }}
                                                >
                                                    {`${authorizationHeader}: ${prefix}`}
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    {securitySchemeType !== 'API-KEY' && selectedKMObject && (
                                        <Button
                                            onClick={
                                                !ksGenerated && securitySchemeType === 'OAUTH'
                                                    ? () => Alert.warning('No consumer key/secret found for this application. Please go to My Applications and generate keys first.')
                                                    : (isConsumerSecretRequired
                                                        ? () => setSecretDialogOpen(true)
                                                        : generateAccessToken)
                                            }
                                            disabled={!user
                                                || (subscriptions && subscriptions.length === 0 && !isSubValidationDisabled)
                                                || isUpdating}
                                            id='gen-test-key'
                                            sx={{
                                                fontFamily: pop,
                                                fontWeight: 600,
                                                fontSize: 13,
                                                whiteSpace: 'nowrap',
                                                minWidth: 140,
                                                height: 48,
                                                borderRadius: '8px',
                                                background: ORANGE,
                                                color: '#fff',
                                                border: 'none',
                                                letterSpacing: '0.04em',
                                                flexShrink: 0,
                                                boxShadow: '0 4px 14px rgba(255,95,0,0.35)',
                                                '&:hover': { background: '#E65500', boxShadow: '0 4px 18px rgba(255,95,0,0.45)' },
                                                '&:disabled': { background: 'rgba(255,95,0,0.35)', color: 'rgba(255,255,255,0.5)', boxShadow: 'none' },
                                            }}
                                        >
                                            {isUpdating && (
                                                <CircularProgress size={14} sx={{ color: '#fff', mr: 1 }} />
                                            )}
                                            Get Test Key
                                        </Button>
                                    )}
                                    {securitySchemeType === 'API-KEY' && (
                                        <Button
                                            onClick={generateApiKey}
                                            disabled={!user
                                                || (subscriptions && subscriptions.length === 0 && !isSubValidationDisabled)
                                                || isUpdating}
                                            id='gen-api-key'
                                            sx={{
                                                fontFamily: pop,
                                                fontWeight: 600,
                                                fontSize: 13,
                                                whiteSpace: 'nowrap',
                                                minWidth: 140,
                                                height: 48,
                                                borderRadius: '8px',
                                                background: ORANGE,
                                                color: '#fff',
                                                border: 'none',
                                                letterSpacing: '0.04em',
                                                flexShrink: 0,
                                                boxShadow: '0 4px 14px rgba(255,95,0,0.35)',
                                                '&:hover': { background: '#E65500', boxShadow: '0 4px 18px rgba(255,95,0,0.45)' },
                                                '&:disabled': { background: 'rgba(255,95,0,0.35)', color: 'rgba(255,255,255,0.5)', boxShadow: 'none' },
                                            }}
                                        >
                                            {isUpdating && (
                                                <CircularProgress size={14} sx={{ color: '#fff', mr: 1 }} />
                                            )}
                                            Get API Key
                                        </Button>
                                    )}
                                </Box>
                            </Box>
                        )}

                        {/* Gateway section */}
                        {environments && environments.length > 0 && (
                            <Box sx={{ mb: 3 }}>
                                <Box component='span' sx={{ ...labelSx, fontSize: 15, fontWeight: 600, color: textColor, mb: '12px' }}>
                                    Gateway
                                </Box>
                                <Box sx={{
                                    background: panelBg,
                                    border: `1px solid ${border}`,
                                    borderRadius: '8px',
                                    padding: '16px',
                                    maxWidth: 340,
                                }}>
                                    <Box component='span' sx={{ ...labelSx, mb: '8px' }}>Environment</Box>
                                <TextField
                                    fullWidth
                                    select
                                    id='environment'
                                    value={selectedEnvironment || (environments && environments[0].name)}
                                    name='selectedEnvironment'
                                    onChange={handleChanges}
                                    margin='none'
                                    variant='outlined'
                                    sx={fieldSx}
                                    SelectProps={{ MenuProps: darkMenuProps }}
                                >
                                    {environments.map((env) => (
                                        <MenuItem value={env.name} key={env.name} sx={menuItemSx}>
                                            {env.displayName}
                                        </MenuItem>
                                    ))}
                                </TextField>

                                {/* GraphQL extra URLs */}
                                {api && api.type === 'GRAPHQL' && (
                                    <Box sx={{ mt: 2 }}>
                                        <Box
                                            component='a'
                                            onClick={() => setShowMoreGWUrls(!showMoreGWUrls)}
                                            onKeyDown={() => setShowMoreGWUrls(!showMoreGWUrls)}
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                color: ORANGE,
                                                fontFamily: pop,
                                                fontSize: 13,
                                                cursor: 'pointer',
                                                textDecoration: 'none',
                                                mb: 2,
                                            }}
                                        >
                                            {!showMoreGWUrls ? (
                                                <>
                                                    <FormattedMessage
                                                        id={'Apis.Details.ApiConsole.SelectAppPanel.environment.show.more'}
                                                        defaultMessage='Show More'
                                                    />
                                                    <ExpandMoreIcon sx={{ fontSize: 18, ml: 0.5 }} />
                                                </>
                                            ) : (
                                                <>
                                                    <FormattedMessage
                                                        id={'Apis.Details.ApiConsole.SelectAppPanel.environment.show.less'}
                                                        defaultMessage='Show Less'
                                                    />
                                                    <ExpandLessIcon sx={{ fontSize: 18, ml: 0.5 }} />
                                                </>
                                            )}
                                        </Box>
                                        {showMoreGWUrls && (
                                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                                <Box>
                                                    <Box component='span' sx={labelSx}>Gateway URLs</Box>
                                                    <TextField
                                                        value={URLs && URLs.https}
                                                        name='selectedHTTPURL'
                                                        fullWidth
                                                        margin='none'
                                                        variant='outlined'
                                                        InputProps={URLs && URLs.https}
                                                        sx={fieldSx}
                                                    />
                                                </Box>
                                                {URLs && URLs.wss && (
                                                    <Box>
                                                        <Box component='span' sx={labelSx}>Subscription Gateway URLs</Box>
                                                        <TextField
                                                            value={URLs && URLs.wss}
                                                            name='selectedWSURL'
                                                            fullWidth
                                                            margin='none'
                                                            variant='outlined'
                                                            InputProps={URLs && URLs.wss}
                                                            sx={fieldSx}
                                                        />
                                                    </Box>
                                                )}
                                            </Box>
                                        )}
                                    </Box>
                                )}
                                </Box>
                            </Box>
                        )}
                    </Box>
                ) : (
                    <AdvertiseDetailsPanel
                        classes={classes}
                        advAuthHeader={advAuthHeader}
                        advAuthHeaderValue={advAuthHeaderValue}
                        handleChanges={handleChanges}
                        selectedEndpoint={selectedEndpoint}
                        api={api}
                    />
                )}
            </Box>
        </Root>
    );
}

TryOutController.propTypes = {
    classes: PropTypes.shape({
        paper: PropTypes.string,
        grid: PropTypes.string,
        inputAdornmentStart: PropTypes.string,
        centerItems: PropTypes.string,
    }),
};

TryOutController.defaultProps = {
    classes: {},
};

export default (TryOutController);
