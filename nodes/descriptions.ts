import { INodeTypeDescription } from 'n8n-workflow';

export const nodeDescription: INodeTypeDescription = {
    displayName: 'PEPAY',
    name: 'pepay',
    icon: 'file:pepay.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"]}}',
    description: 'Process cryptocurrency payments via PEPAY',
    defaults: {
        name: 'PEPAY',
    },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [
        {
            name: 'pepayApi',
            required: true,
        },
    ],
    properties: [
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
                },
                {
                    name: 'Get Invoice Totals',
                    value: 'getInvoiceTotals',
                    description: 'Get invoice totals and statistics',
                    action: 'Get invoice totals and statistics',
                },
            ],
            default: 'createInvoice',
        },
        // Create Invoice Parameters
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
            description: 'Amount in USD',
        },
        // ... more parameters
    ],
};