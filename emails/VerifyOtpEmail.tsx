import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Section,
  Preview,
} from "@react-email/components";

interface VerifyOtpEmailProps {
  otp: string;
  email: string;
}

export default function VerifyOtpEmail({ otp, email }: VerifyOtpEmailProps) {
  return (
    <Html>
      <Head>
        {/* Mobile Responsive Styles */}
        <style>{`
          @media only screen and (max-width: 600px) {
            .container {
              padding: 24px 16px !important;
              width: 100% !important;
            }
            .heading {
              font-size: 20px !important;
            }
            .otp {
              font-size: 22px !important;
              letter-spacing: 4px !important;
              padding: 12px 20px !important;
            }
            .text {
              font-size: 14px !important;
            }
          }
        `}</style>
      </Head>
      <Preview>Verify your email with OTP</Preview>
      <Body
        style={{
          fontFamily: "Arial, sans-serif",
          backgroundColor: "#f9fafb",
          color: "#1f2937",
          margin: 0,
          padding: "20px",
        }}
      >
        <Container
          className="container"
          style={{
            margin: "0 auto",
            padding: "40px 32px",
            backgroundColor: "#ffffff",
            borderRadius: "14px",
            maxWidth: "500px",
            width: "100%",
            boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
          }}
        >
          <Section>
            {/* Heading */}
            <Text
              className="heading"
              style={{
                fontSize: "24px",
                fontWeight: "700",
                textAlign: "center",
                marginBottom: "16px",
                color: "#111827",
              }}
            >
              Verify Your Email
            </Text>

            {/* Greeting */}
            <Text
              className="text"
              style={{
                fontSize: "15px",
                marginBottom: "20px",
                color: "#374151",
                textAlign: "center",
              }}
            >
              Hello <b>{email}</b>,
            </Text>

            {/* Instruction */}
            <Text
              className="text"
              style={{
                fontSize: "15px",
                marginBottom: "20px",
                textAlign: "center",
                color: "#4b5563",
              }}
            >
              Please use the OTP below to verify your account:
            </Text>

            {/* OTP Box */}
            <Text
              className="otp"
              style={{
                display: "block",
                padding: "16px 28px",
                fontSize: "28px",
                fontWeight: "bold",
                letterSpacing: "8px",
                textAlign: "center",
                backgroundColor: "#f3f4f6",
                borderRadius: "8px",
                color: "#111827",
                margin: "0 auto 24px",
                width: "100%",
                boxSizing: "border-box",
              }}
            >
              {otp}
            </Text>

            {/* Expiry Note */}
            <Text
              className="text"
              style={{
                fontSize: "13px",
                color: "#6b7280",
                textAlign: "center",
                marginTop: "12px",
              }}
            >
              This OTP is valid for 15 minutes. Please do not share it with
              anyone.
            </Text>

            {/* Footer */}
            <Text
              style={{
                marginTop: "40px",
                fontSize: "12px",
                color: "#9ca3af",
                textAlign: "center",
              }}
            >
              © {new Date().getFullYear()} SCENTSKAPE. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
