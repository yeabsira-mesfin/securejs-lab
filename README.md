# SecureJS Lab

Interactive JavaScript and TypeScript secure coding laboratory evolved from the original ES6KeyFeatures exercises. The existing ArrayOperators and BasicFeatures folders remain untouched and are preserved in Git history.

## Implemented

- Responsive React + TypeScript learning interface with 6 interactive modules.
- Input validation for bounded, normalized attendee records.
- Prototype pollution mitigation by denying dangerous object keys.
- DOM XSS mitigation through textContent and React text rendering.
- Object-level authorization examples with owner, viewer, maintainer and admin permissions.
- Safe log redaction for passwords, tokens, secrets and email fields.
- Same-origin API consumption with explicit timeout, response-type validation and sanitized errors.
- Type-safe reusable implementations of map, filter, find, findIndex, every, some, includes and indexOf.
- Vitest unit tests, coverage reporting, TypeScript checks and GitHub Actions dependency auditing.

## Run locally

Requirements: Node.js 22+ and npm.

1. npm install
2. npm run dev
3. Open the Vite URL and select any lab. The risky patterns are shown only as text; the Run button executes only defensive implementations.
4. npm test
5. npm run coverage
6. npm run check
7. npm run build
8. npm run audit

## Security design and threat analysis

This project teaches browser XSS, prototype pollution, incomplete input validation, broken object authorization, unsafe logs, and poor asynchronous error handling. Intentionally vulnerable snippets are never executed in a server process and are not exposed as endpoints.

The lab is not an authentication server, a production API, or a vulnerability scanner. Real applications must repeat all policy and validation decisions on the trusted backend. The publicConfig helper restricts API roots to same-origin relative URLs, and the network client rejects external origins. No actual credentials or private datasets are required.

## Existing examples

ArrayOperators includes Every, Filter, Find, FindIndex, Includes, IndexOf, Map and Some. BasicFeatures includes destructuring, defaults, rest/spread, template literals, logical AND, and the ternary operator. Original console examples are left intact and the new typed counterparts are unit-tested.

## Portfolio summary

Developed a tested React/TypeScript secure-coding playground illustrating prototype pollution defense, DOM XSS mitigation, input validation, RBAC/BOLA checks, safe logging, and secure API handling, with automated tests and CI.
