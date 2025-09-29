💰 Cash Register App

A simple Cash Register web app built with HTML, CSS, and JavaScript.
The app calculates change based on the item price, cash provided, and the cash in drawer (CID).
It also supports transaction history and allows resetting the history.

🚀 Features

Input fields for item price and customer cash.

Handles different scenarios:

Customer does not have enough money to purchase the item (alert).

No change due - customer paid with exact cash.

Status: OPEN → Shows change due, sorted from highest to lowest denomination.

Status: CLOSED → When the change equals the cash drawer total.

Status: INSUFFICIENT_FUNDS → When the drawer cannot provide exact change.

Transaction history with details (Price, Cash, Change, Status).

Reset History button to clear all past transactions.

Responsive, professional UI.

📂 Project Structure
cash-register-app/
│── index.html      # Main HTML file
│── style.css       # CSS styling
│── script.js       # JavaScript logic
│── README.md       # Project documentation

⚙️ How It Works

Enter the item price in the "Item Price" input.

Enter the cash provided by the customer in the "Cash Provided" input.

Click Purchase to calculate change.

Results will appear under the Change Due section.

Each transaction is saved in the Transaction History table.

Use the Reset History button to clear the history.

🧾 Example Scenarios

Exact Payment

Price: $19.50

Cash: $19.50

Output: No change due - customer paid with exact cash

Open Status

Price: $19.50

Cash: $20

Drawer: [["PENNY", 1.01], ["NICKEL", 2.05], ...]

Output: Status: OPEN QUARTER: $0.5

Insufficient Funds

Price: $19.50

Cash: $20

Drawer: [["PENNY", 0.01], ["NICKEL", 0], ...]

Output: Status: INSUFFICIENT_FUNDS

Closed Status

Price: $19.50

Cash: $20

Drawer: [["PENNY", 0.5], ["NICKEL", 0], ...]

Output: Status: CLOSED PENNY: $0.5

🛠️ Tech Stack

HTML5 – Structure

CSS3 – Styling and layout

JavaScript (ES6) – App logic


🔮 Future Improvements

Add multiple items support (shopping cart style).

Persistent history storage (localStorage).

Mobile-first UI optimization.

Currency selection (USD, EUR, PHP, etc.).
