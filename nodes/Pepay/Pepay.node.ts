import { IExecuteFunctions, INodeType, INodeExecutionData } from 'n8n-workflow';
import { PepaySDK, PepayError } from '@pepay/sdk';
import { nodeDescription } from './descriptions';
import { handleCreateInvoice } from './actions/createInvoice';
import { handleGetInvoice } from './actions/getInvoice';
import { handleListInvoices } from './actions/listInvoices';
import { handleGetInvoiceTotals } from './actions/getInvoiceTotals';

export class Pepay implements INodeType {
    description = nodeDescription;

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        const credentials = await this.getCredentials('pepayApi');
        const pepay = new PepaySDK(credentials.apiKey, {
            baseUrl: 'https://api.pepay.io'
        });

        const operation = this.getNodeParameter('operation', 0) as string;

        try {
            let result;
            switch (operation) {
                case 'createInvoice':
                    result = await handleCreateInvoice(this, pepay);
                    break;
                case 'getInvoice':
                    result = await handleGetInvoice(this, pepay);
                    break;
                case 'listInvoices':
                    result = await handleListInvoices(this, pepay);
                    break;
                case 'getInvoiceTotals':
                    result = await handleGetInvoiceTotals(this, pepay);
                    break;
                default:
                    throw new Error(`Unknown operation: ${operation}`);
            }

            return [this.helpers.returnJsonArray(result)];
        } catch (error) {
            if (error instanceof PepayError) {
                throw new Error(`PEPAY API Error (${error.code}): ${error.message}`);
            }
            throw error;
        }
    }
}