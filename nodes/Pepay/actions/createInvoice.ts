
import { IExecuteFunctions } from 'n8n-workflow';
import { PepaySDK, CreateInvoiceParams } from '@pepay/sdk';
import { validateAmount } from '../../helpers/validation';

export async function handleCreateInvoice(
    executeFunctions: IExecuteFunctions,
    pepay: PepaySDK
) {
    const amount = executeFunctions.getNodeParameter('amount_usd', 0) as number;
    const description = executeFunctions.getNodeParameter('description', 0) as string;
    const metadata = executeFunctions.getNodeParameter('metadata', 0) as Record<string, any>;
    const expiresIn = executeFunctions.getNodeParameter('expires_in', 0) as number;

    validateAmount(amount);

    const params: CreateInvoiceParams = {
        amount_usd: amount,
        description,
        metadata,
        expires_in: expiresIn
    };

    return await pepay.createInvoice(params);
}