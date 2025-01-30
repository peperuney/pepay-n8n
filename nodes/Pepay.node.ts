import { INodeType, INodeTypeDescription } from 'n8n-workflow';
import { PepaySDK } from '@pepay/sdk';

export class Pepay implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'PEPAY',
        name: 'pepay',
        group: ['finance'],
        version: 1,
        description: 'Process crypto payments with PEPAY',
        defaults: { name: 'PEPAY' },
        inputs: ['main'],
        outputs: ['main'],
        credentials: [{ name: 'pepayApi', required: true }],
        properties: [
            // Operation selector
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                options: [
                    { name: 'Create Invoice', value: 'createInvoice' },
                    { name: 'Get Invoice', value: 'getInvoice' },
                    { name: 'Get Invoice Status', value: 'getInvoiceStatus' },
                    { name: 'List Invoices', value: 'listInvoices' }
                ],
                default: 'createInvoice',
                noDataExpression: true,
            },
            // Invoice ID Field for queries
            {
                displayName: 'Invoice ID',
                name: 'invoice_id',
                type: 'string',
                required: true,
                displayOptions: {
                    show: { operation: ['getInvoice'] }
                },
                description: 'ID of the invoice to retrieve'
            },
            // Search Fields
            {
                displayName: 'Search By',
                name: 'searchBy',
                type: 'options',
                displayOptions: {
                    show: { operation: ['getInvoice'] }
                },
                options: [
                    { name: 'Invoice ID', value: 'invoice_id' },
                    { name: 'Transaction Hash', value: 'transaction_hash' },
                    { name: 'Customer ID', value: 'customer_id' }
                ],
                default: 'invoice_id',
                description: 'Field to search by'
            },
            // Create Invoice Fields
            {
                displayName: 'Amount (USD)',
                name: 'amount_usd',
                type: 'number',
                required: true,
                displayOptions: {
                    show: { operation: ['createInvoice'] }
                }
            },
            {
                displayName: 'Description',
                name: 'description',
                type: 'string',
                displayOptions: {
                    show: { operation: ['createInvoice'] }
                }
            }
        ]
    };

    async execute() {
        const pepay = new PepaySDK(this.getCredentials('pepayApi'));
        const operation = this.getNodeParameter('operation', 0) as string;

        switch (operation) {
            case 'createInvoice':
                const amount = this.getNodeParameter('amount_usd', 0) as number;
                const description = this.getNodeParameter('description', 0) as string;
                return await pepay.createInvoice({ amount_usd: amount, description });

            case 'getInvoice':
                const searchBy = this.getNodeParameter('searchBy', 0) as string;
                const searchValue = this.getNodeParameter('invoice_id', 0) as string;
                
                let endpoint = '/api/v1/invoices';
                switch (searchBy) {
                    case 'invoice_id':
                        endpoint += `/${searchValue}`;
                        break;
                    case 'transaction_hash':
                        endpoint += `/by-transaction/${searchValue}`;
                        break;
                    case 'customer_id':
                        endpoint += `/customer/${searchValue}`;
                        break;
                }
                
                return await pepay.request(endpoint);
        }
    }
}