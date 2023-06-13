import Footer from "./Footer";

export default function Layout({ children }: any) {
  return (
    <>
      <main className="">{children}</main>
      <Footer />
    </>
  );
}
