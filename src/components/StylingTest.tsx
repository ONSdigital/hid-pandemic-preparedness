export default function StylingTestComponent() {
  return (
    <>
      <h1 className="heading-xl">Heading-xl example</h1>
      <h1 className="heading-l">Heading-l example</h1>
      <h1 className="heading-m">Heading-m example</h1>
      <h1 className="heading-s">Heading-xl example</h1>
      <div
        className="spacing-2xs"
        style={{ background: "green", width: "50%" }}
      >
        spacing-2xs example
      </div>
      <div
        className="spacing-xs"
        style={{ background: "green", width: "50%", marginTop: "10px" }}
      >
        spacing-xs example
      </div>
      <div
        className="spacing-sm"
        style={{ background: "green", width: "50%", marginTop: "10px" }}
      >
        spacing-sm example
      </div>
      <div
        className="spacing-md"
        style={{ background: "green", width: "50%", marginTop: "10px" }}
      >
        spacing-md example
      </div>
      <div
        className="spacing-lg"
        style={{ background: "green", width: "50%", marginTop: "10px" }}
      >
        spacing-lg example
      </div>
      <div
        className="spacing-xl"
        style={{ background: "green", width: "50%", marginTop: "10px" }}
      >
        spacing-xl example
      </div>
      <div
        className="spacing-2xl"
        style={{ background: "green", width: "50%", marginTop: "10px" }}
      >
        spacing-2xl example
      </div>
    </>
  );
}
