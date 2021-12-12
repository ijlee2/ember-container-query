# Contributing to ember-container-query

Open source projects like `ember-container-query` live on your words of encouragement and contribution. Please give feedback, report issues, or submit pull requests!

Here are some guidelines to help you and everyone else.


## Setup

<details>
<summary>Installation</summary>

1. Fork and clone this repo.

    ```bash
    git clone git@github.com:<your GitHub handle>/ember-container-query.git
    ```

1. Change directory.

    ```bash
    cd ember-container-query
    ```

1. Use `yarn` to install dependencies.

    ```bash
    yarn install
    ```

</details>


<details>
<summary>Running demo app</summary>

1. After following the installation step, you can run the app.

    ```bash
    ember serve
    ```

1. Open the app at [http://localhost:4200](http://localhost:4200).

</details>


<details>
<summary>Linting</summary>

1. When you write code, please check dependencies, template files, and JavaScript files often.

    ```bash
    yarn lint
    ```

    This command will lint files and dependencies in parallel. You can run `yarn lint:fix` to fix HBS and JS files.

</details>


<details>
<summary>Running tests - very important ⚠️</summary>

1. The setup is quite different from most addons. We check the addon and demo app at _9_ various widths and heights.

1. When you write code, please check both addon and demo app often.

    ```bash
    yarn test
    ```

1. A couple of caveats. `yarn test --server` may result in failed tests due to inexact test window size. Using `--filter` may also result in failed tests. I use the filters for responsive testing so please don't overwrite them with your own.

1. When you write code, you don't need to check addon compatibility. I suggest leaving this to CI. For every PR, the CI will lint files and dependencies, run tests, and check compatible versions—all in parallel! 💯

</details>


## How Can I Help?

If you haven't before, I encourage you to watch [Sean Massa's mini-talk](https://www.youtube.com/watch?v=CcSKlsc_AhQ) on what it means to be a contributor. To sum up his talk, you can be a contributor in many ways. I want you to discover a path that meets your goals well!

Here are some suggestions to help you start:


<details>
<summary>Give feedback 💞</summary>

1. An open source project's value comes from people using the code and extending it to make greater things. Let me know how you use container query in your Ember app or addon!

1. You can **create an issue** to:

    - Share a story about how you used `ember-container-query`
    - Share what you liked about `ember-container-query`
    - Share what you didn't like about `ember-container-query`

1. When sharing what you didn't like, please do give constructive feedback by **suggesting a specific solution** for how `ember-container-query` can be improved.

</details>


<details>
<summary>Help with marketing 📢</summary>

1. I don't have a Twitter account.<sup>§</sup> It's up to you to help me advertise `ember-container-query` on Twitter!

    <sup>§ Funny story. Whoever had signed up as `@ijlee2` got their account banned so I can't use the handle.</sup>

1. Other platforms include:

    - Blog post
    - GitHub star
    - Meetup or conference talk
    - Social media
    - Word of mouth

</details>


<details>
<summary>Join this project 👩‍💻👨‍💻</summary>

1. Please help me maintain `ember-container-query`! This is my first Ember addon so there is much that I don't know.

1. Some skill sets that I'd love to learn from you are:

    - Address accessibility (for demo app)
    - Cut releases
    - Research bleeding-edge ways to do container query
    - Respond to issues
    - Review pull requests

    If you have experience in one of these areas and want to help, contact me on [Discord](https://discord.com/invite/emberjs) at `@ijlee2`!

</details>


<details>
<summary>Make issues 📝</summary>

1. In addition to sharing feedback (described in `How Can I Help? - Give feedback`), you can create an issue to:

    - Ask for better documentation
    - Ask for new feature or refactor
    - Report bug
    - Report outdated dependency

1. When reporting a bug, please provide a **well-written report** to help me understand what's going on. If possible, please use the latest version of `ember-container-query` and set up a public demo that I and others can check out.

</details>


<details>
<summary>Make pull requests 🎉</summary>

1. I'd love to keep the number of open issues small! If you find a problem that interests you, please **join the conversation in the open issue**. I will assign you to the issue to keep everyone updated.

1. I can check in now and then (likely on [Discord](https://discord.com/invite/emberjs)) to gauge progress and lend help.

<details>
<summary>Before making a pull request</summary>

1. I strongly encourage you to:

    - Add tests (please read `Setup - Running tests`)
    - Ensure that each commit is short but meaningful, and paves a clear way to the eventual solution
    - Write readable, maintainable code (this includes code comments and styles)

    I believe, if we can spend a few extra hours to address these issues, we can better maintain this project on the long run.

1. Please check if the demo app looks correct by resizing the window on Chrome and Firefox. Percy snapshots are taken in these browsers so we have good references. Checking on Safari and Edge are optional but recommended.

1. At any point, if you are unsure of something, don't hesitate to reach out!

</details>

<details>
<summary>When making a pull request</summary>

1. I encourage you to practice writing a good report. You can:

    - Provide a well-written description of the problem and your solution
    - Demo your code by attaching before-and-after screenshots or GIFs
    - List references (links) that helped you solve the problem
    - Make a note on:
      - Alternate approaches that you tried but didn't work
      - Ideas and thoughts that you had
      - Outstanding issues

    The first two practices are strongly encouraged. The last two are optional depending on the situation.

1. Feel free to look at [some of my pull requests](https://github.com/ijlee2/ember-container-query/pulls?q=is%3Apr+author%3Aijlee2) for examples.

</details>

<details>
<summary>After making a pull request</summary>

1. First and foremost, thank you for spending time to make a pull request! Please give yourself a warm pat and a break for your health.

1. I (or another reviewer) will review your code and make suggestions in a timely manner. If I am busy at the moment, I will leave a comment and keep you posted on my availability!

1. If a request for change is made, I encourage you to address them soon while the code is fresh in your mind!

1. If my (or another reviewer's) comment isn't clear, feel free to ask for clarification.

</details>

</details>


<details>
<summary>Share code ✨</summary>

1. I think it'd be amazing to **have a showcase page** within the demo app, much like [D3.js](https://observablehq.com/@d3/gallery). People would submit code for their component that uses container query.

1. What the page would look like and which widths and heights a component can use aren't clear yet.

1. If you'd like to help out, either by sharing your component code or designing the showcase page, contact me on [Discord](https://discord.com/invite/emberjs) at `@ijlee2`!

</details>

💡 Have more ideas for contribution? Please reach out on [Discord](https://discord.com/invite/emberjs) to `@ijlee2`!