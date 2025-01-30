import { ITriggerFunctions, INodeType, INodeTypeDescription } from 'n8n-workflow';
import { verifyWebhookSignature } from '../helpers/WebhookHelpers';
import { WebhookEvent, PepayCredentials } from '../types';

export class PepayTrigger implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'PEPAY Webhook',
        name: 'pepayTrigger',
        group: ['trigger'],
        version: 1,
        description: 'Handle PEPAY payment webhooks',
        defaults: { name: 'PEPAY Webhook' },
        inputs: [],
        outputs: ['main'],
        credentials: [{ name: 'pepayApi', required: true }],
        webhooks: [{
            name: 'default',
            httpMethod: 'POST',
            responseMode: 'onReceived',
            path: 'webhook'
        }],
        properties: [
            {
                displayName: 'Events',
                name: 'events',
                type: 'multiOptions',
                options: [
                    { name: 'Invoice Paid', value: 'invoice.paid' },
                    { name: 'Invoice Expired', value: 'invoice.expired' },
                    { name: 'Partial Payment', value: 'invoice.partial_payment' },
                    { name: 'Invoice Overpaid', value: 'invoice.overpaid' }
                ],
                default: ['invoice.paid'],
                required: true
            }
        ]
    };

    async webhook(this: ITriggerFunctions) {
        const webhookData = this.getWebhookData();
        const credentials = await this.getCredentials('pepayApi') as PepayCredentials;
        
        if (!verifyWebhookSignature(
            webhookData.body,
            webhookData.headers['x-pepay-signature'] as string,
            webhookData.headers['x-pepay-timestamp'] as string,
            credentials.webhookSecret
        )) {
            return {};
        }

        const event = webhookData.body as WebhookEvent;
        const events = this.getNodeParameter('events') as string[];

        if (events.includes(event.type)) {
            return {
                workflowData: [this.helpers.returnJsonArray([event])]
            };
        }

        return {};
    }
}