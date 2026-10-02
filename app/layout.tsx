import "./globals.css";

export const metadata = {
  title: "MADAI",
  description: "Holographic AI COO",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className="
          bg-black
          text-white
          antialiased
        "
        style={{
          // MADAI Theme
          backgroundColor: "#000000",
          color: "#ffffff",
        }}
      >
        {children}
      </body>
    </html>
  );
}
