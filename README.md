# PolishDocs Starter pack
## Co to jest?
Jest to projekt początkowy od którego zaczynamy wszystkie tłumaczenia.

## Od czego zacząć
1.  Sklonuj repozytorium jako nowe, czyste repozytorium.
  ```
  $ git clone --mirror https://github.com/PolishDocs/Docs-StarterPack/
  ```

2.  Zrób mirror-push do nowego repozytorium.
  ```
  $ cd stare-repo.git
  $ git push --mirror https://github.com/PolishDocs/nowe-repo.git
  ```

3.  Usuń tymczasowe lokalne repozytorium utworzone w kroku 1.
  ```
  $ cd ..
  $ rm -rf Docs-StarterPack
  ```

4.  Następnie wejdź do nowego repozytorium i uruchom npm.
  ```
  $ cd nowe-repo
  $ npm install
  ```

5. Aby uruchomić preprocesory (Markdown, PugJS)
  ```
  $ npm start
  ```

## Jak tworzyć tłuamczenie
Każdy rozdział, jak i podrozdział powinien być umieszczony w nowym pliku w folderze ``pages/index``, a następnie dodany w pliku ``options/config.json``.

## ``config.json``
Jest to plik, w którym dodajemy każdy rozdział i podrozdział, aby wyświetlił się na stronie.
```
{
	"pages": [
		{
			"url": "/",
			"chapters": [
				{
					"id": "introduction", // Każdy rozdział jak i podrozdział musi mieć unikatowy identyfikator
					"title": "Wstęp", // Tytuł, który pojawi się w menu (jeżeli false rozdział/podrozdział nie pojawi się w menu)
					"link": "#introduction", // #id (ToDo: nie trzeba tego wpisywać)
					"urlToDownload": "/pages/index/intro.html", // Link do pliku html (musi być to link absolutny)
					"subchapters": [
                        {
                          "id": "each",
                          "title": "each",
                          "link": "#each",
                          "urlToDownload": "/pages/index/collections/each.html"
                        }
                    ]
				}
			]
		}
	]
}
```

## ``options.pug``
Jest to plik, w którym zmieniamy:
  + nazwę projektu, który tłumaczymy
  + jego wersję
  + link do licencji (licenseUrl)
  + link do oryginalnego projektu (libUrl)
  + kolor podstawowy UI (colorPrimary)
  + kolor poboczny UI (colorSecondary)

Dostępne kolory (z https://getmdl.io/customize/):
  + orange: ![#ff9800](http://i.imgur.com/hb0fxrS.png)
  + deep_orange: ![#ff5722](http://i.imgur.com/Bvs8Irj.png)
  + red: ![#f44336](http://i.imgur.com/VKsjNp5.png)
  + pink: ![#e91e63](http://i.imgur.com/qxhybFw.png)
  + purple: ![#673ab7](http://i.imgur.com/i4UWH5P.png)
  + indigo: ![#3f51b5](http://i.imgur.com/1eyFHBq.png)
  + blue: ![#2196f3](http://i.imgur.com/AFD8BVh.png)
  + light_blue:  ![#03a9f4](http://i.imgur.com/YRom3x8.png)
  + cyan: ![#00bcd4](http://i.imgur.com/BgqHdKp.png)
  + teal: ![#009688](http://i.imgur.com/DYhTHGY.png)
  + green: ![#4caf50](http://i.imgur.com/J1dHdvK.png)
  + light_green: ![#8bc34a](http://i.imgur.com/H8AFy7A.png)
  + lime: ![#cddc39](http://i.imgur.com/SHZXD89.png)
  + yellow: ![#ffeb3b](http://i.imgur.com/9y9SzX7.png)
  + amber: ![#ffc107](http://i.imgur.com/bWTd6tc.png)
  + brown: ![#795548](http://i.imgur.com/BLDSPrO.png) (tylko jako kolor podstawowy)
  + blue_grey: ![#607d8b](http://i.imgur.com/t3jdslL.png) (tylko jako kolor podstawowy)
  + grey: ![#9e9e9e](http://i.imgur.com/6K2miXC.png) (tylko jako kolor podstawowy)
