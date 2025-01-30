import { IExecuteFunctions } from 'n8n-workflow';
import { PepaySDK } from '@pepay/sdk';

export async function handleGetInvoice(
    executeFunctions: IExecuteFunctions,
    pepay: PepaySDK
) {
    const searchBy = executeFunctions.getNodeParameter('searchBy', 0) as string;
    const searchValue = executeFunctions.getNodeParameter('searchValue', 0) as string;

    switch (searchBy) {
        case 'invoice_id':
            return await pepay.request(`/api/v1/invoices/${searchValue}`);
        case 'transaction_hash':
            return await pepay.request(`/api/v1/invoices/by-transaction/${searchValue}`);
        case 'customer_id':
            return await pepay.getCustomerInvoices(searchValue);
        default:
            throw new Error(`Invalid search type: ${searchBy}`);
    }
}
