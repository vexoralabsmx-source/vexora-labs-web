import { sendAffiliateOrderNotification } from "@/lib/discord";
import {
  getBearerToken,
  getSupabaseUser,
  json,
  rpc,
  supabaseFetch,
} from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const token = getBearerToken(request);
    await getSupabaseUser(token);

    const isAdmin = await rpc<boolean>("is_admin", {}, token);

    if (!isAdmin) {
      return json(
        {
          success: false,
          message: "Solo admin",
        },
        403
      );
    }

    const body = await request.json().catch(() => ({}));
    const orderId = String(body?.order_id || "").trim();

    if (!orderId) {
      return json(
        {
          success: false,
          message: "order_id requerido",
        },
        400
      );
    }

    const orders = await supabaseFetch(
      `/rest/v1/affiliate_orders?select=*&id=eq.${encodeURIComponent(orderId)}&limit=1`,
      { token }
    );

    const order = Array.isArray(orders) ? orders[0] : null;

    if (!order) {
      return json(
        {
          success: false,
          message: "Orden no encontrada",
        },
        404
      );
    }

    try {
      await sendAffiliateOrderNotification(order);

      return json({
        success: true,
        notification_sent: true,
      });
    } catch (error) {
      console.warn("Admin Discord notification failed:", error);

      return json({
        success: true,
        notification_sent: false,
        warning: "No se pudo enviar la notificacion a Discord",
      });
    }
  } catch (error) {
    return json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Error",
      },
      401
    );
  }
}
