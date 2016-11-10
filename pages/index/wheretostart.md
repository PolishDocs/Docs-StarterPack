##### Od czego zacząć
1.  Sklonuj repozytorium jako nowe, czyste repozytorium.
  ```git
  $ git clone --mirror https://github.com/PolishDocs/Docs-StarterPack/
  ```

2.  Zrób mirror-push do nowego repozytorium.
  ```git
  $ cd stare-repo.git
  $ git push --mirror https://github.com/PolishDocs/nowe-repo.git
  ```

3.  Usuń tymczasowe lokalne repozytorium utworzone w kroku 1.
  ```git
  $ cd ..
  $ rm -rf Docs-StarterPack
  ```

4.  Następnie wejdź do nowego repozytorium i uruchom npm.
  ```git
  $ cd nowe-repo
  $ npm install
  ```

5. Aby uruchomić preprocesory (Markdown, PugJS)
  ```git
  $ npm start
  ```
