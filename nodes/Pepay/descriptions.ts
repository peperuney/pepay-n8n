import { INodeProperties } from 'n8n-workflow';

export const nodeDescription: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        options: [
            {
                name: 'Create Invoice',
                value: 'createInvoice',
                description: 'Create a new payment invoice',
                action: 'Create a new payment invoice',
            },
            {
                name: 'Get Invoice',
                value: 'getInvoice',
                description: 'Get invoice details',
                action: 'Get invoice details',
            },
            {
                name: 'List Invoices',
                value: 'listInvoices',
                description: 'Get a list of invoices',
                action: 'Get a list of invoices',
            }
        ],
        default: 'createInvoice',
    },
    // Create Invoice Fields
    {
        displayName: 'Amount (USD)',
        name: 'amount_usd',
        type: 'number',
        required: true,
        displayOptions: {
            show: {
                operation: ['createInvoice'],
            },
        },
        default: 0,
        description: 'Amount in USD (min: 0.01, max: 1,000,000)',
    },
    {
        displayName: 'Description',
        name: 'description',
        type: 'string',
        displayOptions: {
            show: {
                operation: ['createInvoice'],
            },
        },
        default: '',
        description: 'Invoice description',
    },
    {
        displayName: 'Customer ID',
        name: 'customer_id',
        type: 'string',
        displayOptions: {
            show: {
                operation: ['createInvoice'],
            },
        },
        default: '',
        description: 'Your customer identifier',
    },
    {
        displayName: 'Metadata',
        name: 'metadata',
        type: 'fixedCollection',
        displayOptions: {
            show: {
                operation: ['createInvoice'],
            },
        },
        typeOptions: {
            multipleValues: true,
        },
        default: {},
        options: [
            {
                name: 'metadataValues',
                displayName: 'Metadata',
                values: [
                    {
                        displayName: 'Key',
                        name: 'key',
                        type: 'string',
                        default: '',
                        description: 'Key of metadata',
                    },
                    {
                        displayName: 'Value',
                        name: 'value',
                        type: 'string',
                        default: '',
                        description: 'Value of metadata',
                    },
                ],
            },
        ],
        description: 'Additional data to include with the invoice',
    }
];