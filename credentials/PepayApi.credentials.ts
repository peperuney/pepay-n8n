import {
    IAuthenticateGeneric,
    ICredentialType,
    INodeProperties,
} from 'n8n-workflow';

export class PepayApi implements ICredentialType {
    name = 'pepayApi';
    displayName = 'PEPAY API';
    documentationUrl = 'https://docs.pepay.io/api';
    
    authenticate: IAuthenticateGeneric = {
        type: 'generic',
        properties: {
            headers: {
                'X-API-Key': '={{$credentials.apiKey}}'
            }
        }
    };

    properties: INodeProperties[] = [
        {
            displayName: 'API Key',
            name: 'apiKey',
            type: 'string',
            typeOptions: {
                password: true
            },
            default: '',
            required: true,
            description: 'The PEPAY API key from your dashboard'
        },
        {
            displayName: 'Environment',
            name: 'environment',
            type: 'options',
            options: [
                { name: 'Production', value: 'production' },
                { name: 'Testnet', value: 'testnet' }
            ],
            default: 'production'
        }
    ];
}