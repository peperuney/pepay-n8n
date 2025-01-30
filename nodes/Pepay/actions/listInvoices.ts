import { IExecuteFunctions } from 'n8n-workflow';
import { PepaySDK } from '@pepay/sdk';

export async function handleListInvoices(
    executeFunctions: IExecuteFunctions,
    pepay: PepaySDK
) {
    const returnAll = executeFunctions.getNodeParameter('returnAll', 0) as boolean;
    const filters = executeFunctions.getNodeParameter('filters', 0, {}) as {
        status?: 'paid' | 'unpaid' | 'expired' | 'all';
    };

    if (returnAll) {
        const items = [];
        let hasMore = true;
        let page = 1;

        while (hasMore) {
            const response = await pepay.listInvoices({
                page,
                status: filters.status,
            });

            if (!response.items?.length) {
                hasMore = false;
                break;
            }

            items.push(...response.items);
            
            hasMore = response.has_more === true;
            page++;

            if (page > 100) break;
        }

        return {
            items,
            total: items.length,
            totals: response.totals
        };
    }

    const limit = executeFunctions.getNodeParameter('limit', 0) as number;
    const response = await pepay.listInvoices({
        page: 1,
        status: filters.status,
    });

    return {
        items: response.items.slice(0, limit),
        total: response.items.length,
        totals: response.totals
    };
}