import { NextRequest } from 'next/server';
import { decrypt } from '../../../../lib/ccavenue';

export async function POST(request: NextRequest) {
    try {
        const workingKey = process.env.CCAVENUE_WORKING_KEY!;
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3005';

        // CCAvenue sends response as application/x-www-form-urlencoded
        const formData = await request.formData();
        const encResp = formData.get('encResp') as string;

        if (!encResp) {
            return Response.redirect(`${baseUrl}/payment/failure?reason=no_response`);
        }

        // Decrypt the response
        const decrypted = decrypt(encResp, workingKey);

        // Parse the decrypted response string (key=value&key=value format)
        const params: Record<string, string> = {};
        decrypted.split('&').forEach((pair) => {
            const [key, ...valueParts] = pair.split('=');
            if (key) {
                params[key.trim()] = valueParts.join('=').trim();
            }
        });

        const orderStatus = params.order_status || '';
        const orderId = params.order_id || '';
        const trackingId = params.tracking_id || '';
        const amount = params.amount || '';
        const currency = params.currency || '';
        const packageId = params.merchant_param1 || '';
        const packageTitle = params.merchant_param2 || '';

        if (orderStatus === 'Success') {
            const successParams = new URLSearchParams({
                order_id: orderId,
                tracking_id: trackingId,
                amount,
                currency,
                package_id: packageId,
                package_title: packageTitle,
            });
            return Response.redirect(`${baseUrl}/payment/success?${successParams.toString()}`);
        } else {
            const failureReason = orderStatus === 'Aborted' ? 'cancelled' : 'failed';
            const failureParams = new URLSearchParams({
                reason: failureReason,
                order_id: orderId,
                status: orderStatus,
            });
            return Response.redirect(`${baseUrl}/payment/failure?${failureParams.toString()}`);
        }
    } catch (error: any) {
        console.error('CCAvenue response error:', error);
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3005';
        return Response.redirect(`${baseUrl}/payment/failure?reason=error`);
    }
}
