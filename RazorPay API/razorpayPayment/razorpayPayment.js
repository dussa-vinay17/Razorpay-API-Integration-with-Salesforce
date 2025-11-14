import { LightningElement } from 'lwc';
import createOrder from '@salesforce/apex/RazorpayOrderService.createOrder';

export default class RazorpayPayment extends LightningElement {

    amount = 0; // store user amount
    vfWindow;

    handleAmountChange(event) {
        this.amount = event.target.value;
        console.log("Amount entered:", this.amount);
    }

    vfReady() {
        console.log("LWC: VF iframe loaded");
        this.vfWindow = this.template.querySelector("iframe").contentWindow;
    }

    async startPayment() {

        console.log("LWC: Pay button clicked");

        if(!this.amount || this.amount <= 0) {
            alert("Please enter a valid amount!");
            return;
        }

        // Show fullscreen iframe
        this.template.querySelector("iframe").style.display = "block";

        try {
            console.log("LWC: Creating order with amount:", this.amount);

            let order = await createOrder({ amountValue: this.amount });
            console.log("LWC: Order created:", JSON.stringify(order));

            const msg = {
                command: "startPayment",
                key: "rzp_test_Rf6qeq3FtjSxhh", // your test key
                amount: order.amount,
                currency: order.currencyCode,
                orderId: order.id
            };

            console.log("LWC: Sending message to VF:", JSON.stringify(msg));

            this.vfWindow.postMessage(msg, "*");

        } catch (error) {
            console.error("LWC Payment Error:", error);
        }
    }

    connectedCallback() {
        window.addEventListener("message", (event) => {
            console.log("LWC: Message received:", JSON.stringify(event.data));

            if (event.data.command === "paymentSuccess") {

                alert("Payment Success! Payment ID: " + event.data.data.razorpay_payment_id);

                // Hide iframe after payment
                const frame = this.template.querySelector("iframe");
                if (frame) {
                    frame.style.display = "none";
                }
            }
        });
    }
}
