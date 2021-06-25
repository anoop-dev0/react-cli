# react-cli

# How to use
### setup
* clone the repo
* Install the dependencies and link the cli tool.

    ```sh
    cd react-cli
    npm link
    ```
    change directory to your react app and link this cli tool
    ```sh
    npm link react
    ```

### use
    
* Generate the JSX
    ```sh
    react --jsx src/user
    ```
    ```sh
    react -j src/user
    ```
* Generate the stylesheets
    ```sh
    react --css src/user
    ```
    ```sh
    react --c src/user
    ```
    
* Generate the javascript
    ```sh
    react --js src/user
    ```
    
* Generate multiple files
    ```sh
    react --jsx src/user --jsx src/employee --jsx src/student
    ```

