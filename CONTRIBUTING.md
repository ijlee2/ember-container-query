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

    This command will lint files and dependencies in parallel.
</details>


<details>
<summary>Running tests - very important ⚠️</summary>

1. The setup is quite different from most addons. We check the addon and demo app at _9_ various widths and heights.

1. When you write code, please check both addon and demo app often.

    ```bash
    yarn test
    ```

1. A couple of caveats. `yarn test --server` may not run properly (i.e. opening 9 browsers and shutting them down). If you do want to check something in browser, you can run one script at a time:

    ```bash
    yarn test:ember:w3-h3 --server
    ```

    Using `--filter` will result in failed tests. I use the filters for responsive testing so please don't overwrite them with your own.

1. When you write code, you don't need to check addon compatibility. I suggest leaving this to CI. For every PR, the CI will lint files and dependencies, run tests, and check compatible versions—all in parallel! 💯
</details>