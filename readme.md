
# PEPAY n8n Integration

⚠️ **BETA SOFTWARE - USE AT YOUR OWN RISK**

This integration allows you to process cryptocurrency payments using PEPAY within your n8n workflows.

## Features

- Create payment invoices
- Track payment status
- List and search invoices
- Real-time webhook notifications for payment events

## Installation

```bash
npm install n8n-nodes-pepay
```

## Prerequisites

1. A PEPAY account (sign up at https://pepay.io)
2. API Key from your PEPAY dashboard

## Setup

1. Install the node
2. Add your PEPAY API credentials in n8n:
   - Go to Settings > Credentials
   - Click on 'Add Credential'
   - Select 'PEPAY API'
   - Enter your API key

## Available Operations

### PEPAY Node
- Create Invoice
- Get Invoice
- List Invoices

### PEPAY Trigger Node (Webhooks)
- Invoice Paid
- Invoice Expired
- Partial Payment
- Invoice Overpaid

## Webhook Setup

1. Add a PEPAY Trigger node to your workflow
2. Deploy your n8n instance
3. Copy the webhook URL from the trigger node
4. Add the webhook URL to your PEPAY dashboard

## Support

- Documentation: https://docs.pepay.io
- Issues: https://github.com/pepay/n8n-nodes-pepay/issues
- Email: support@peperuney.pizza

## License

MIT
