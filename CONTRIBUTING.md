# Contributing to ember-container-query

Open source projects like `ember-container-query` live on your words of encouragement and contribution. Please give feedback, report issues, or submit pull requests!

Here are some guidelines to help you and everyone else.


## Local development

You can get started in 2 steps:

1. Run `pnpm install` to install project dependencies. This will build the addon `ember-container-query`.
1. Run `pnpm start` to start `docs-app` ([http://localhost:4200](http://localhost:4200)) and `test-app` ([http://localhost:4300/tests](http://localhost:4300/tests?hidepassed)).


<details>

<summary>Lint files</summary>

1. When you write code, please check that it meets the linting rules.

    ```sh
    # From the workspace root
    pnpm lint
    ```

1. You can run `lint:fix` to automatically fix linting errors.

    ```sh
    # From the workspace root
    pnpm lint:fix
    ```

</details>


<details>

<summary>Run tests</summary>

1. When you write code, please check that all tests continue to pass.

    ```sh
    # From the workspace root
    pnpm test
    ```

</details>


<details>

<summary>Publish packages (for admins)</summary>

1. Generate a [personal access token](https://github.com/settings/tokens/) in GitHub, with default values for scopes (none selected).

1. Run the `release:changelog` script. This removes changesets, updates the package versions, and updates the `CHANGELOG`'s.

    ```sh
    # From the workspace root
    GITHUB_TOKEN=<YOUR_PERSONAL_ACCESS_TOKEN> pnpm release:changelog
    ```

    The `release:changelog` script also updated the workspace root's version (by following the highest version formula). We will use it to name the tag that will be published.

    ```
    # Highest version formula
    workspace root version = max(
      max(all package versions),
      workspace root version + 0.0.1,
    );
    ```

1. [Create a tag](https://github.com/ijlee2/ember-container-query/releases/new) and provide release notes. The tag name should match the package version.

1. Publish the package.

    ```sh
    # From the workspace root
    pnpm release:publish
    ```

</details>


## How can I help?

If you haven't before, I encourage you to watch [Sean Massa's mini-talk](https://www.youtube.com/watch?v=CcSKlsc_AhQ) on what it means to be a contributor. To sum up the talk, you can be a contributor in many ways. I want you to discover a path that meets your goals well!

Here are some suggestions to help you start:


<details>

<summary>Give feedback 💞</summary>

1. An open source project's value comes from people using the code and extending it to make greater things. Let me know how you use container queries in your Ember app or addon!

1. You can **create an issue** to:

    - Share how you used `ember-container-query`
    - Share what you liked or didn't like about `ember-container-query`

</details>


<details>

<summary>Help with marketing 📢</summary>

1. Platforms include:

    - Blog post
    - GitHub star
    - Meetup or conference talk
    - Social media
    - Word of mouth

</details>


<details>

<summary>Join this project 👩‍💻👨‍💻</summary>

1. Help me maintain the project! I have limited time and there is much that I don't know.

    - Cut releases
    - Research new ways to implement container queries
    - Respond to issues
    - Review pull requests

</details>


<details>

<summary>Make issues 📝</summary>

1. In addition to sharing feedback (described in `Give feedback`), you can create an issue to:

    - Ask for better documentation
    - Ask for new feature or refactor
    - Report bug
    - Report outdated dependency

1. When reporting a bug, please provide details to help me understand what's going on. If possible, please use the latest version of `ember-container-query` and set up a public demo that I (and others) can check the code.

</details>


💡 Have ideas for contribution? Reach out to `@ijlee2` on [Discord](https://discord.com/invite/emberjs)!
