import { NextRequest, NextResponse } from 'next/server';
import { encrypt } from '../../../../lib/ccavenue';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const merchantId = process.env.CCAVENUE_MERCHANT_ID!;
        const accessCode = process.env.CCAVENUE_ACCESS_CODE!;
        const workingKey = process.env.CCAVENUE_WORKING_KEY!;
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3005';

        const {
            order_id,
            amount,
            currency = 'AED',
            billing_name,
            billing_email,
            billing_tel,
            billing_address = 'N/A',
            billing_city = 'Dubai',
            billing_state = 'Dubai',
            billing_zip = '00000',
            billing_country = 'UAE',
            merchant_param1 = '', // package_id
            merchant_param2 = '', // package_title
            merchant_param3 = '', // travelers count
            merchant_param4 = '', // travel date
        } = body;

        // Build CCAvenue request parameter string
        const params = [
            `merchant_id=${merchantId}`,
            `order_id=${order_id}`,
            `currency=${currency}`,
            `amount=${amount}`,
            `redirect_url=${baseUrl}/api/ccavenue/response`,
            `cancel_url=${baseUrl}/api/ccavenue/response`,
            `language=EN`,
            `billing_name=${billing_name}`,
            `billing_address=${billing_address}`,
            `billing_city=${billing_city}`,
            `billing_state=${billing_state}`,
            `billing_zip=${billing_zip}`,
            `billing_country=${billing_country}`,
            `billing_tel=${billing_tel}`,
            `billing_email=${billing_email}`,
            `merchant_param1=${merchant_param1}`,
            `merchant_param2=${merchant_param2}`,
            `merchant_param3=${merchant_param3}`,
            `merchant_param4=${merchant_param4}`,
        ].join('&');

        const encRequest = encrypt(params, workingKey);

        return NextResponse.json({
            encRequest,
            accessCode,
            merchantId,
            ccavenueUrl: 'https://secure.ccavenue.ae/transaction/transaction.do?command=initiateTransaction',
        });
    } catch (error: any) {
        console.error('CCAvenue encrypt error:', error);
        return NextResponse.json(
            { error: 'Failed to process payment request', details: error.message },
            { status: 500 }
        );
    }
}
