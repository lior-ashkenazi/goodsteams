const CommunityHomeWelcomeDiv = () => {
  return (
    <div className="mb-24">
      <h2 className="text-3xl text-yellow-200">
        Welcome to the GoodSteams Discussions
      </h2>
      <br />
      <p>
        <span>Everyone is invited!</span>{" "}
        <span className="text-green-200">
          The GoodSteams discussions are for everyone, new and advanced user
          alike!
        </span>
      </p>
      <br />
      <p>
        <span>Searching is key!</span>{" "}
        <span className="text-green-200">
          Before you post a question, use the forum search feature to determine
          whether your topic has already been covered.
        </span>
      </p>
      <br />
      <p>
        <span>Do not start flame wars!</span>{" "}
        <span className="text-green-200">
          If someone has engaged in behavior that is detrimental to the
          discussion -- spamming, harassment, etc -- report the post and we'll
          take a look.
        </span>
      </p>
    </div>
  );
};

export default CommunityHomeWelcomeDiv;
