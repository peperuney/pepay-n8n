import { IExecuteFunctions } from 'n8n-workflow';
import { PepaySDK, CreateInvoiceParams } from '@pepay/sdk';

export async function handleCreateInvoice(
    executeFunctions: IExecuteFunctions,
    pepay: PepaySDK
) {
    const amount = executeFunctions.getNodeParameter('amount_usd', 0) as number;
    const description = executeFunctions.getNodeParameter('description', 0) as string;
    const customerId = executeFunctions.getNodeParameter('customer_id', 0) as string;
    const metadata = executeFunctions.getNodeParameter('metadata', 0, {}) as Record<string, any>;
    const expiresIn = executeFunctions.getNodeParameter('expires_in', 0, undefined) as number | undefined;

    if (amount <= 0 || amount > 1000000) {
        throw new Error('Amount must be between 0 and 1,000,000 USD');
    }

    const params: CreateInvoiceParams = {
        amount_usd: amount,
        description,
        customer_id: customerId || undefined,
        metadata: Object.keys(metadata).length ? metadata : undefined,
        expires_in: expiresIn
    };

    return await pepay.createInvoice(params);
}