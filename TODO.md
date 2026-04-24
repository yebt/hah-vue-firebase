# TODO

This is the basic definitions for the requeriments in the APP

This is a simple app with

## Auth

Exits 2 types of user: admin and regular user

The admin go to the dashboard and manage if activate or deactivate
The regular user go inside the app

## APP

The app is for add habits.
Positive and negative habits

I need track my positive habits and when no do the bad habits.

The habit could be a simple habit (do or not)
And a countable habit. This contains:
- A unit (unit to measure the habit, for example: km, min, times, etc)
- a min (minimum value to consider that the habit is not lost, just half done)
- a goal (the value that i need to considere to complete), if the value is greater that the goal, show them with a most pure coolor, like the pattern in github

The habit has a frequency
How many time I need to track if i do the habit in a space of time

- Daily
- Weekly
- Monthly
- 2 times a week
- 3 times a week
- 3 times in the day
- 1 time in the month


The negative habit is to not do, like eat junk food, smoke, etc. I need to track when I do the bad habit, and try to reduce it.

## Tehcnology stack

- Vue 3
- router with file based routing
- Pinia
- pinia colada (for queries and optimistic updates)
- unocss with lucide icons and wind4 (tailwind4)
- firebase
- vuefire
- vite pwa
