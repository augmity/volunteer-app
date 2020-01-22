# Volunteer App

An application to manage teams of volunteers (or, any teams (`People`) that need to do things (`Jobs`) at places (`Locations`) at given times (`Schedule`)).

Volunteers have a simple way (mobile or desktop app) to check the details of their shifts (`Schedule`, `Locations`), communicate with team members and team leaders (`Conversations`).

## Getting Started

1. Clone the repository.
2. Create a firebase project to store your data (https://firebase.google.com/).
3. Go to `src/config.ts` and update it with your firebase credentials.
4. `npm start` to run the app locally, `npm build` to build it.

## Implemented Features

- Login/Signup via Firebase Auth
- People list
- Locations list
- Shifts list
- Shifts scheduler
- Schedule wizard
- realtime updates of the data on all the devices