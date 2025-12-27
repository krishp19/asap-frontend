import OrderTrackingClient from "@/components/orders/OrderTrackingClient";

export default async function OrderTrackingPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;

  return <OrderTrackingClient orderId={orderId} />;
}
