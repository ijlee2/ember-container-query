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

<summary>Add changeset to pull request</code></summary>

1. To record how a pull request affects packages, you will want to add a changeset.

    The changeset provides a summary of the code change. It also describes how package versions should be updated (major, minor, or patch) as a result of the code change.

    ```sh
    # From the workspace root
    pnpm changeset
    ```

</details>


<details>

<summary>Publish packages (for admins)</summary>

1. Generate a [personal access token](https://github.com/settings/tokens/) in GitHub, with default values for scopes (none selected).

1. Run the `release:prepare` script. This removes changesets, updates package versions, and updates `CHANGELOG`s.

    ```sh
    # From the workspace root
    GITHUB_TOKEN=<YOUR_PERSONAL_ACCESS_TOKEN> pnpm release:prepare
    ```

    Note, `release:prepare` also updated the workspace root's version (e.g. from `0.1.1` to `0.1.2`). We will use it to name the tag that will be published.

1. Review the file changes. Commit them in a branch, then open a pull request to merge the changes to the `main` branch.

    ```sh
    # From the workspace root
    git checkout -b tag-0.1.2
    git add .
    git commit -m "Tagged 0.1.2"
    git push origin tag-0.1.2
    ```

1. [Create a tag](https://github.com/ijlee2/ember-container-query/releases/new) and provide release notes. The tag name should match the workspace root's version (e.g. `0.1.2`).

1. Publish the packages.

    ```sh
    # From the workspace root
    pnpm release:publish
    ```

</details>
