@echo off
echo Starting HireNext (Frontend & Backend)...
echo The servers will run together in this single window.
echo You can access the app at http://localhost:5173/
echo Press Ctrl+C to stop both servers gracefully.
echo.

npm run dev

echo.
echo =======================================================
echo If you see this, the server crashed or stopped.
echo Read the errors above to see what went wrong.
echo =======================================================
pause
