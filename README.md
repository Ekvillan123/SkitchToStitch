SketchToStitch: Custom T-Shirt Design Application
Unleash your creativity, stitch by stitch!

👕 Project Overview
SketchToStitch is an interactive web application that empowers users to design their own custom T-shirts. Users can select garment colors, add various graphic stickers, and visualize their creations in a real-time 3D environment. This project aims to provide an intuitive and engaging platform for personalized apparel design, from concept to potential order.

✨ Features
Custom Garment Color Selection: Choose from a wide palette or select a custom hue for your T-shirt.

Dynamic Sticker Application: Add pre-defined graphic designs or upload your own custom images.

Interactive 2D Design Canvas: Manipulate sticker position, size, and rotation on a familiar 2D interface.

Real-time 3D Preview: Visualize your personalized T-shirt in an immersive 3D model that updates instantly with your design changes.

User Authentication (Simulated): Sign up, log in, and manage user sessions for a personalized experience.

User Dashboard: View your saved designs and simulated order history.

Responsive Design: Optimized for a seamless experience across various devices.

🚀 Technologies Used
Frontend:

React: A declarative, component-based JavaScript library for building user interfaces.

TypeScript: Enhances code quality and maintainability with static type checking.

Tailwind CSS: A utility-first CSS framework for rapid and responsive UI development.

Three.js: A powerful 3D JavaScript library for rendering the interactive T-shirt model.

GLTFLoader: For loading the 3D T-shirt model.

OrbitControls: For enabling interactive camera controls in the 3D scene.

HTML Canvas API: Used for dynamic texture generation, combining garment color and sticker graphics.

React Router DOM: For client-side routing and navigation.

React Hot Toast: For user-friendly notifications.

Lucide React: For crisp, customizable SVG icons.

localStorage: Utilized as a temporary client-side "database" for user authentication, designs, and orders during development.

Planned Future Backend (Conceptual):

Node.js (with Express.js)

MongoDB (for persistent data storage)

📦 Setup & Installation
To get SketchToStitch up and running locally, follow these steps:

Clone the repository:

git clone <your-repo-url>
cd project # Navigate into your project directory, e.g., 'CCC5/project'

Install dependencies:

npm install

Place the 3D model:

Ensure you have a 3D model named tshirt_model.glb.

Place this file inside the public/models/ directory in your project root. If the models folder doesn't exist, create it.

(Note: The tshirt_model.glb file is external and not part of this code. You need to provide your own 3D model.)

Start the development server:

npm run dev

Open in browser:

Your application should now be running at http://localhost:5173 (or a similar port).

🚀 Usage
Navigate to the Home page: (/) - Get an overview of the application.

Go to the Design Studio: (/design)

Select a base color for your T-shirt from the palette or using the custom color picker.

Choose from various pre-defined designs or upload your own image.

(Note: The current canvas might not support direct dragging/resizing on the 2D plane visually yet, but the designs are added.)

Save Your Design: Click the "Save Design" button. You'll be prompted for a design name. (Requires login).

View 3D Preview: Click "3D Preview" to see your customized T-shirt rendered in an interactive 3D space.

Authentication:

Visit /auth to sign up for a new account or log in with existing credentials.

All user data, designs, and orders are stored in localStorage for this demo. You can inspect them in your browser's Developer Tools (Application tab -> Local Storage).

Dashboard: (/dashboard) - After logging in, visit your dashboard to see a list of your saved designs and simulated orders.

🚧 Future Enhancements / Known Limitations
Full Backend Integration: Transition from localStorage to a robust, secure backend (Node.js/Express with MongoDB) for persistent user data, designs, and order management.

Enhanced 2D Canvas Interaction: Implement drag, resize, and rotate functionalities directly on the 2D design canvas for more precise sticker manipulation.

Payment Gateway Integration: Implement a real payment processing workflow with a chosen payment gateway (e.g., Stripe, PayPal).

AI Integration: Explore AI for features like:

Text-to-Image Design Generation: Allowing users to create designs from text prompts.

Style Transfer: Applying artistic styles to uploaded images.

Smart Design Suggestions: AI-powered recommendations for sticker placement or color palettes.

Virtual Try-On: Using AI to render designs on a user's photo or webcam feed.

Optimized 3D Rendering: Further performance improvements for smoother 3D visualization across devices.

Real-time Order Status Tracking.

Dedicated Image Hosting: For uploaded custom designs (e.g., Firebase Storage, AWS S3).

🤝 Contact / Credits

Developed by: Revanth Hanumanthu
