"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  { question: "What are your fees?", answer: "Our fees vary depending on the service provided. Please contact us for details." },
  { question: "Do you take insurance?", answer: "Yes, we accept most major insurance plans. Please verify with your provider." },
  { question: "Do you provide online counseling?", answer: "Yes, we offer secure video counseling sessions." },
  { question: "What are your office hours?", answer: "Monday to Friday: 9am – 6pm, Saturday: 10am – 2pm." },
  { question: "What geographic areas do you serve?", answer: "We serve clients across the state and offer online sessions nationwide." },
  { question: "What services do you offer?", answer: "We offer individual, couples, and family counseling services." },
];

// Custom hook for intersection observer
const useIntersectionObserver = <T extends Element = HTMLDivElement>(options = {}): [React.RefObject<T>, boolean] => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return [ref, isIntersecting];
};

type AnimatedSectionProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

const AnimatedSection = ({ children, className = "", delay = 0 }: AnimatedSectionProps) => {
  const [ref, isIntersecting] = useIntersectionObserver();
  
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`transition-all duration-1000 ease-out ${
        isIntersecting 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [heroRef, heroIntersecting] = useIntersectionObserver();
  const router = useRouter();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleNavigate = () => {
    router.push("/contactUs"); 
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <AnimatedSection className="px-4 sm:px-8 md:px-14 bg-[#f3f0e8]">
        <nav className="w-full flex items-center justify-start py-6 sm:py-8 md:py-12">
          <img
            src="https://images.squarespace-cdn.com/content/v1/64d3ecd6f85a702f7881b802/450ce2f6-bc20-432a-9e9e-4a48a995b92b/logo-transparent-png.png?format=1500w"
            alt="Jennifer Hahm Logo"
            className="h-12 sm:h-16 md:h-[4.3rem] w-auto"
          />
        </nav>

      {/* Hero Section */}
        <section className="relative h-[60vh] sm:h-[70vh] md:h-[46rem] w-full overflow-hidden bg-[#f3f0e8]">
          {/* Full-size background wrapper */}
          <div className="absolute inset-0 z-0 bg-[#f3f0e8] flex items-center justify-center">
            {/* Padded video container */}
            <div className="w-full h-full brightness-[0.6]">
              <video
                className="w-full h-full object-cover object-center"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src="/hero.mp4" type="video/mp4" />
              </video>
            </div>
          </div>

          {/* Overlay */}
          <div className="absolute inset-0 z-10" />

          {/* Content */}
          <section className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6 text-white">
            <div className={`transition-all duration-1500 ease-out delay-300 ${
              heroIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[55px] font-semibold font-serif leading-tight tracking-wide mb-8 sm:mb-16 md:mb-24">
                Psychological Care for
              </h1>
            </div>

            <div className={`transition-all duration-1500 ease-out delay-500 ${
              heroIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[55px] font-serif font-semibold leading-tight tracking-wide mb-4 sm:mb-6 mt-[-20px] sm:mt-[-30px] md:mt-[-40px]">
                Change, Insight, and Well-Being
              </h2>
            </div>

            <div className={`transition-all duration-1500 ease-out delay-700 ${
              heroIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <p className="mt-4 text-base sm:text-lg md:text-xl lg:text-[22px] font-serif tracking-wide leading-relaxed max-w-4xl">
                Offering individual psychotherapy for adults via telehealth in
                Michigan and <span className="underline">most U.S. states</span>{" "}
                through PSYPACT participation
              </p>
            </div>

            <div className={`transition-all duration-1500 ease-out delay-900 ${
              heroIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <button className="ellipse mt-8 sm:mt-12 text-xs sm:text-sm px-6 py-3 bg-white text-black rounded-full hover:bg-gray-100 transition-colors font-medium tracking-wider" onClick={handleNavigate}>
                SCHEDULE A CONSULTATION
              </button>
            </div>
          </section>
        </section>

        <div className="h-[25px] sm:h-[50px] bg-[#f3f0e8]" ref={heroRef as React.RefObject<HTMLDivElement>}></div>
      </AnimatedSection>

      {/* About Section */}
      <AnimatedSection className="bg-[#fefefe] px-4 sm:px-8 md:px-[8%] lg:px-[15%] py-12 sm:py-16 md:py-[15%]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start gap-8 sm:gap-12 md:gap-24 lg:gap-48 justify-around">
          {/* Text Content */}
          <div className="flex-1 text-[#7E7E6B] order-2 lg:order-1">
            <h2 className="text-2xl sm:text-3xl md:text-4xl mb-6 sm:mb-8 md:mb-10 text-[#7E7E6B]">
              About Dr. Jennifer Hahm
            </h2>

            <p className="mb-4 sm:mb-5 font-extralight text-sm sm:text-base md:text-lg">
              Finding time and opportunities to care for ourselves can be
              incredibly challenging in today's busy and demanding world. I
              believe therapy offers a dedicated space for self-care, providing
              the support and tools needed to improve this essential practice.
              Therapy can help individuals identify and clarify their goals,
              values, and the various elements that contribute to their
              well-being, recognizing that these aspects vary from person to
              person.
            </p>

            <p className="mb-4 sm:mb-5 text-sm sm:text-base md:text-lg font-extralight">
              I am dedicated to supporting this journey by offering active
              listening, psychological knowledge, empathy, compassion, and
              insights into behavioral patterns and tendencies. I hold a
              master's degree in Clinical Psychology from the Michigan School of
              Psychology (2012) and a Ph.D. in Counseling Psychology from
              Western Michigan University (2018). My experience spans therapy
              and psychological assessment in psychiatric inpatient units,
              academic medical centers, universities, and outpatient practice
              settings.
            </p>

            <p className="text-sm sm:text-base md:text-lg font-extralight">
              My therapeutic approach is primarily psychodynamic and humanistic,
              enriched by influences from positive psychology, existentialism,
              family systems theory, acceptance and commitment concepts, and
              mindfulness practices.
            </p>
          </div>

          {/* Image */}
          <div className="flex-shrink-0 w-full sm:w-80 md:w-96 lg:w-[400px] order-1 lg:order-2">
            <img
              src="https://images.squarespace-cdn.com/content/v1/64d3ecd6f85a702f7881b802/e841b9a0-6e90-4af7-89ff-cfb7018239e5/AD8A7645-Edit.jpg"
              alt="Dr. Jennifer Hahm"
              className="w-full h-auto object-cover rounded-md"
            />
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <div className="mx-4 sm:mx-8 md:mx-20 mb-12 sm:mb-16 md:mb-20 border border-1 border-[#7E7E6B]"></div>
      </AnimatedSection>

      {/* Therapy Space Section */}
      <AnimatedSection className="bg-[#f3f0e8] py-12 sm:py-16 md:py-20 px-4 text-center text-gray-700">
        {/* Main Heading */}
        <div className="max-w-4xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-extrathin leading-snug text-[#7E7E6B] px-4">
            Therapy can be a space where you invest in yourself—
            <br className="hidden sm:block" />
            <span className="block mt-2">
              one of the highest forms of self-care.
            </span>
          </h2>
          <p className="mt-6 sm:mt-8 text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed px-4">
            You may be led to therapy by anxiety, depression, relationship
            stress, past or recent trauma, grief and loss, self-esteem issues,
            or challenges with family, parenting, or parental relationships.
            Whatever the source of your stress, you don't have to face it alone.
            Therapy offers you the time and space to work toward wellness and
            peace.
          </p>
        </div>

        {/* Divider */}
        <div className="w-[90%] max-w-6xl mx-auto border-b border-[#7E7E6B] mb-12 sm:mb-16 md:mb-20" />

        {/* Areas of Focus */}
        <div className="mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12 text-center px-4 sm:px-6">
          {/* Item 1 */}
          <AnimatedSection delay={100}>
            <div className="flex flex-col items-center">
              <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-[350px] md:h-[350px] mx-auto mb-6 overflow-hidden rounded-full">
                <img
                  src="https://images.squarespace-cdn.com/content/v1/64d3ecd6f85a702f7881b802/25a4d543-1f55-46b7-ba06-c571a0c2b806/pexels-tima-miroshnichenko-6011667.jpg"
                  alt="Healthcare Providers"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="max-w-sm">
                <h3 className="text-lg sm:text-xl md:text-2xl font-serif text-gray-800 mb-4">
                  Therapy for Healthcare Providers and Students
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-sans">
                  The care you provide for others may be driving you to seek
                  therapy, whether due to burnout, compassion fatigue, imposter
                  syndrome, people-pleasing tendencies, or perfectionism. Whether
                  you're in pre-professional school, undergoing training, or
                  reflecting on a long career in healthcare, we can address the
                  unique stressors of your professional environment along with any
                  challenges you may be facing in other areas of your life.
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Item 2 */}
          <AnimatedSection delay={200}>
            <div className="flex flex-col items-center">
              <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-[350px] md:h-[350px] mx-auto mb-6 overflow-hidden rounded-full">
                <img
                  src="https://images.squarespace-cdn.com/content/v1/64d3ecd6f85a702f7881b802/11e69e15-d9e7-4182-aeb0-aacd9fc81e02/pexels-raphael-brasileiro-1687007.jpg"
                  alt="Trauma and Grief"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="max-w-sm">
                <h3 className="text-lg sm:text-xl md:text-2xl font-serif text-gray-800 mb-4">
                  Therapy for Trauma and Grief
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-sans">
                  Life's challenges, whether a difficult childhood, a traumatic
                  event or series of events, or the loss of someone or something
                  deeply meaningful, can lead to profound experiences of trauma
                  and grief. Therapy offers a supportive space to process these
                  experiences, care for yourself amidst painful thoughts and
                  emotions, and work toward a sense of grounding and meaning.
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Item 3 */}
          <AnimatedSection delay={300}>
            <div className="flex flex-col items-center">
              <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-[350px] md:h-[350px] mx-auto mb-6 overflow-hidden rounded-full">
                <img
                  src="https://images.squarespace-cdn.com/content/v1/64d3ecd6f85a702f7881b802/eeca6997-7fd7-4376-b0a4-df60a0f368e5/pexels-polina-tankilevitch-8202906.jpg"
                  alt="Second Generation"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="max-w-sm">
                <h3 className="text-lg sm:text-xl md:text-2xl font-serif text-gray-800 mb-4">
                  Therapy for Second Generation Individuals In Immigrant Families
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-sans">
                  Second-generation individuals in immigrant families, born in the
                  U.S. to at least one parent born abroad, often navigate the
                  complexities of multiple cultures and diverse expectations. This
                  experience can bring challenges such as feeling like a foreigner
                  in your own country and navigating strained family
                  relationships. Therapy offers a supportive space to explore and
                  process this unique aspect of your identity.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </AnimatedSection>

      {/* Rates Section */}
      <AnimatedSection className="bg-[#94b0b0] py-12 sm:py-16 md:py-20 px-4 text-center text-black">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrathin font-serif mb-8 sm:mb-10 text-black">
            Rates and Insurance
          </h2>

          <p className="text-base sm:text-lg font-sans mb-3 sm:mb-4">Session Fee – $200</p>
          <p className="text-base sm:text-lg font-sans mb-6 sm:mb-8">
            Psychodiagnostic Evaluation – $225
          </p>

          <p className="text-sm sm:text-base font-sans mb-4 sm:mb-6 px-4">
            I accept both private pay and insurance. I am in-network with BCBS
            and Aetna.
          </p>

          <p className="text-sm sm:text-base font-sans px-4">
            For out-of-network plans, I've partnered with Mentaya using
            <a
              href="#"
              className="underline ml-1 text-black hover:text-gray-800 transition-colors"
            >
              this tool
            </a>{" "}
            to help you check your eligibility for reimbursement for my
            services.
          </p>
        </div>
      </AnimatedSection>

      {/* Unable to Accept Section */}
      <AnimatedSection className="bg-[#f3f0e8] py-16 sm:py-20 md:py-24">
        <div className="max-w-4xl mx-auto text-center px-4">
          <p className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 font-serif">
            Unable to accept new clients at this time.
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <section className="bg-[#C6EDF0] py-8 sm:py-12 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border-t border-gray-400 pt-4">
                  <button
                    className="w-full text-left flex justify-between items-center text-base sm:text-lg font-semibold text-gray-800 focus:outline-none pr-4"
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  >
                    <span className="flex-1">{faq.question}</span>
                    <ChevronDown
                      className={`transition-transform duration-300 flex-shrink-0 ml-2 ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                      size={20}
                    />
                  </button>
                  {openIndex === index && (
                    <p className="mt-2 text-gray-700 text-sm sm:text-base pr-8">{faq.answer}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Quote Section */}
      <AnimatedSection className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] w-full overflow-hidden flex items-center justify-center">
        {/* Background Image */}
        <img
          src="https://images.squarespace-cdn.com/content/v1/64d3ecd6f85a702f7881b802/44c05ca0-453a-453a-811d-c7bc342ee810/pexels-josh-sorenson-386148.jpg"
          alt="Ocean background"
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-70"
        />

        {/* Overlay Text */}
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl">
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif text-black">
            "I have come to believe that caring for myself is not self-indulgent.
          </p>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif text-black mt-2 sm:mt-4">
            Caring for myself is an act of survival."
          </p>
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-gray-700 font-light">
            — Audre Lorde
          </p>
        </div>
      </AnimatedSection>

      {/* Footer */}
      <AnimatedSection>
        <footer className="bg-[#f3f0e8] text-center py-12 sm:py-16 px-4 text-gray-800 font-serif">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-light mb-4 sm:mb-6">
            Jennifer Hahm, Ph.D., Licensed Psychologist
          </h2>

          <div className="space-y-2 text-sm sm:text-base md:text-lg">
            <p>
              <a href="mailto:jennifer@drjenniferhahm.com" className="underline break-all">
                jennifer@drjenniferhahm.com
              </a>
            </p>
            <p className="flex flex-col sm:flex-row justify-center items-center gap-1 sm:gap-2">
              <span>
                Phone:{' '}
                <a href="tel:2489398150" className="underline">
                  (248) 939-8150
                </a>
              </span>
              <span className="hidden sm:inline">|</span>
              <span>Fax: (248) 939-8190</span>
            </p>
            <p className="text-sm sm:text-base">28175 Haggerty Rd, Novi, MI 48377</p>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-2">
              <a href="#" className="underline">
                Home
              </a>
              <a href="#" className="underline">
                Privacy Policy
              </a>
              <a href="#" className="underline">
                Good Faith Estimate
              </a>
            </div>
          </div>

          <div className="mt-16 sm:mt-20 md:mt-24">
            <a href="#" className="underline text-base sm:text-lg">
              Client Portal
            </a>
          </div>

          <p className="mt-8 sm:mt-10 text-sm sm:text-base md:text-lg text-gray-700">
            © 2025 Jennifer Hahm Ph.D. Psychological Services, PLLC. All rights reserved.
          </p>
        </footer>
      </AnimatedSection>
    </div>
  );
}