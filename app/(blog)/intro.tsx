import PortableText from "./portable-text";

export default function Intro(props: {
  title: string | null | undefined;
  description: any;
}) {
  const title = props.title || "";
  const description = props.description?.length ? props.description : [];
  return (
    <section className="mt-16 mb-16 flex flex-col items-center lg:mb-12 lg:flex-row lg:justify-between">
      <h1 className="text-balance text-6xl font-bold leading-tight tracking-tighter lg:pr-8 lg:text-8xl">
        {title}
      </h1>
      <h2 className="text-pretty mt-5 text-center text-lg lg:pl-8 lg:text-left">
        <PortableText className="prose-lg" value={description} />
      </h2>
    </section>
  );
}
