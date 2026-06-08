// app/test/page.tsx
import { auth } from "@clerk/nextjs/server";

const TestPage = async () => {
    let jsonProduct = null;
    let jsonOrder = null;
    let productError = null;
    let orderError = null;
    let jsonPayment = null;
    let paymentError = null;


    const { getToken, userId } = await auth();
    const token = await getToken();

    console.log("UserId:", userId);
    console.log("Token exists:", !!token);

    // Fetch product service independently
    try {
        const resProduct = await fetch("http://localhost:8000/test", {
            headers: { Authorization: `Bearer ${token}` },
            cache: "no-store",
        });
        jsonProduct = await resProduct.json();
        console.log("Product service OK:", jsonProduct);
    } catch (err) {
        productError = (err as Error).message;
        console.error("Product service FAILED:", productError);
    }

    // Fetch order service independently
    try {
        const resOrder = await fetch("http://localhost:8001/test", {
            headers: { Authorization: `Bearer ${token}` },
            cache: "no-store",
        });
        jsonOrder = await resOrder.json();
        console.log("Order service OK:", jsonOrder);
    } catch (err) {
        orderError = (err as Error).message;
        console.error("Order service FAILED:", orderError);
    }

    // Fetch payment service independently
    try {
        const resPayment = await fetch("http://localhost:8002/test", {
            headers: { Authorization: `Bearer ${token}` },
            cache: "no-store",
        });
        jsonPayment = await resPayment.json();
        console.log("Product service OK:", jsonPayment);
    } catch (err) {
        paymentError = (err as Error).message;
        console.error("Product service FAILED:", paymentError);
    }

    return (
        <div>
            <h1 className="text-blue-500 text-5xl font-extrabold flex items-center justify-center p-4 m-4">Test Page</h1>

            <h2>Product Service {productError ? "❌" : "✅"}</h2>
            {productError
                ? <pre style={{ color: "red" }}>{productError}</pre>
                : <pre>{JSON.stringify(jsonProduct, null, 2)}</pre>
            }

            <h2>Order Service {orderError ? "❌" : "✅"}</h2>
            {orderError
                ? <pre style={{ color: "red" }}>{orderError}</pre>
                : <pre>{JSON.stringify(jsonOrder, null, 2)}</pre>
            }

            <h2>Payment Service {paymentError ? "❌" : "✅"}</h2>
            {paymentError
                ? <pre style={{ color: "red" }}>{orderError}</pre>
                : <pre>{JSON.stringify(jsonPayment, null, 2)}</pre>
            }
        </div>
    );
};

export default TestPage;