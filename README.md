# Pick Up Surveys

## Idea

The main idea of the application is to create a survey easily and send it to some email recipients to get a feedback about something (opinion poll, service or product, academic research, etc). Nothing new, right?

The differences with other well known survey apps are:

* The cards-in-board interface, very user friendly to create the questions and answers, drag and drop items and organize your survey
* Every change is saved and displayed in the board at real time.
* The email body contains already a question with its answer to be saved if clicked.
* Get the partial feedback if a recipient drops the survey in the middle of the process.

## How it Works

With SurveyZilla you choose a title for your survey and start creating it in an easy and fun way.
Every question you create is a card in a board.
You can add ‘choices’ (possible answers) to those cards.
You can drag & drop around the cards and the answers to your preference sequence.
Every change you made is saved and displayed in real time.
You can see a preview (how recipients will see the survey on their screens).

With a special tool, you can edit the email body and choose a question that will be displayed in it with its possible answers like ‘buttons’ (they are links indeed). When a recipient replies choosing an option, it will be redirected to the rest of the survey. The email feedback will be already saved in the database. And every answered question will be saved in real time, so if the user drops the survey, at least a partial feedback is retained to your analysis, being this one of the special features of this app.

## Tech Stack

Project bootstraped with create-react-app

* `React v16`
* `React Router v4`
* `Redux` (and its helper libraries)
* `NodeJS` with `Express`
* `MongoDB` & `Mongoose`

For sending emails:

* `@sendgrid/mail`

For authentication:

* `Passport` (and helpers oAuth)
* `bcrypt-nodejs`
* `cookie-session`

Front end styling tools

* `Material-ui` vNext
* `react-beautiful-dnd`
* `Redux-form`
* `Recharts`

## The MIT License

Copyright (c) 2018 LeoAbulafia

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

