import PageHeader from "@/components/PageHeader";

export default function AboutPage() {
  return (
    <>
      <PageHeader title="About Us" crumbRight="About Us" />
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* About Us content */}
        <p>We are …</p>
      </section>
    </>
  );
}
