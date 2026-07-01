import { CtaButton } from "./CtaButton";
import { WaitlistForm } from "./WaitlistForm";

export function WaitlistSection() {
  return (
    <section
      id="waitlist"
      className="scroll-mt-20 bg-background-alt py-16 md:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-8 lg:px-20">
        <div className="mx-auto max-w-lg">
          <div className="mb-8 text-center">
            <h2 className="mb-3 text-2xl font-bold text-on-background sm:text-3xl">
              加入等候名單
            </h2>
            <p className="mb-6 text-on-background-muted">
              留下 Email，課程開放時我們會第一時間通知你
            </p>
            <div className="flex justify-center">
              <CtaButton location="footer">立即加入等候名單</CtaButton>
            </div>
          </div>
          <WaitlistForm />
        </div>
      </div>
    </section>
  );
}
