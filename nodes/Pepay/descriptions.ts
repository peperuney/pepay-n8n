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
    },
    // Get Invoice Fields
    {
        displayName: 'Search By',
        name: 'searchBy',
        type: 'options',
        displayOptions: {
            show: {
                operation: ['getInvoice'],
            },
        },
        options: [
            {
                name: 'Customer ID',
                value: 'customer_id',
                description: 'Search by customer identifier',
            },
            {
                name: 'Invoice ID',
                value: 'invoice_id',
                description: 'Search by invoice identifier',
            },
            {
                name: 'Transaction Hash',
                value: 'transaction_hash',
                description: 'Search by blockchain transaction hash',
            }
        ],
        default: 'customer_id',
        description: 'The method to search for the invoice',
    },
    {
        displayName: 'Value',
        name: 'searchValue',
        type: 'string',
        displayOptions: {
            show: {
                operation: ['getInvoice'],
            },
        },
        default: '',
        required: true,
        description: '={{$parameter["searchBy"] === "customer_id" ? "Customer ID" : $parameter["searchBy"] === "invoice_id" ? "Invoice ID" : "Transaction Hash"}} to search for',
    },
    // List Invoices Fields
    {
        displayName: 'Return All',
        name: 'returnAll',
        type: 'boolean',
        displayOptions: {
            show: {
                operation: ['listInvoices'],
            },
        },
        default: false,
        description: 'Whether to return all results or only up to a given limit',
    },
    {
        displayName: 'Limit',
        name: 'limit',
        type: 'number',
        displayOptions: {
            show: {
                operation: ['listInvoices'],
                returnAll: [false],
            },
        },
        typeOptions: {
            minValue: 1,
            maxValue: 100,
        },
        default: 50,
        description: 'Max number of results to return',
    },
    {
        displayName: 'Filters',
        name: 'filters',
        type: 'collection',
        placeholder: 'Add Filter',
        default: {},
        displayOptions: {
            show: {
                operation: ['listInvoices'],
            },
        },
        options: [
            {
                displayName: 'Status',
                name: 'status',
                type: 'options',
                options: [
                    { name: 'All', value: 'all' },
                    { name: 'Paid', value: 'paid' },
                    { name: 'Unpaid', value: 'unpaid' },
                    { name: 'Expired', value: 'expired' },
                ],
                default: 'all',
                description: 'Filter invoices by status',
            }
        ],
    }
];