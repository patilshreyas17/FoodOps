# Files with Comments in FoodOps Project

This list contains all source code files that contain comments (//, /* */, #, <!--) excluding node_modules, build folders, and metadata.

## Backend Java Files
- Backend/pom.xml
- Backend/README.md
- Backend/src/main/java/com/foodOps/config/AppConfig.java
- Backend/src/main/java/com/foodOps/controller/AnalyticsController.java
- Backend/src/main/java/com/foodOps/controller/CategoryController.java
- Backend/src/main/java/com/foodOps/controller/IngredientsController.java
- Backend/src/main/java/com/foodOps/controller/RestaurantController.java
- Backend/src/main/java/com/foodOps/Exception/GlobalExceptionHandler.java
- Backend/src/main/java/com/foodOps/model/Events.java
- Backend/src/main/java/com/foodOps/model/Food.java
- Backend/src/main/java/com/foodOps/model/Restaurant.java
- Backend/src/main/java/com/foodOps/service/AnalyticsServiceImplementation.java
- Backend/src/main/java/com/foodOps/service/CartServiceImplementation.java
- Backend/src/main/java/com/foodOps/service/OrderServiceImplementation.java
- Backend/src/main/java/com/foodOps/service/PaymentServiceImplementation.java
- Backend/src/main/java/com/foodOps/service/UserServiceImplementation.java

## Frontend React/JavaScript Files
- Frontend/index.html
- Frontend/src/App.css
- Frontend/src/App.jsx
- Frontend/src/config/api.js
- Frontend/src/config/errorHandling.js
- Frontend/src/index.css
- Frontend/src/tailwind.config.js
- Frontend/src/vite.config.js

### Admin Components
- Frontend/src/Admin/AddRestaurants/CreateRestaurantForm.jsx
- Frontend/src/Admin/AddRestaurants/EditRestaurantForm.jsx
- Frontend/src/Admin/Admin.jsx
- Frontend/src/Admin/AdminNavbar.jsx
- Frontend/src/Admin/AdminSidebar.jsx
- Frontend/src/Admin/Analytics/RestaurantAnalytics.jsx
- Frontend/src/Admin/Category/Category.jsx
- Frontend/src/Admin/Dashboard/AddRestaurantCard.jsx
- Frontend/src/Admin/Dashboard/AdminDashboard.jsx
- Frontend/src/Admin/Dashboard/FixedRestaurantDashboard.jsx
- Frontend/src/Admin/Dashboard/RestaurantCard.jsx
- Frontend/src/Admin/Details/Details.jsx
- Frontend/src/Admin/Events/EventCard.jsx
- Frontend/src/Admin/Events/Events.jsx
- Frontend/src/Admin/Food/AddMenuForm.jsx
- Frontend/src/Admin/Food/MenuItemTable.jsx
- Frontend/src/Admin/Food/RestaurantsMenu.jsx
- Frontend/src/Admin/Ingredients/CreateIngredientCategory.jsx
- Frontend/src/Admin/Ingredients/CreateIngredientForm.jsx
- Frontend/src/Admin/Ingredients/Ingredients.jsx
- Frontend/src/Admin/Orders/OrderTable.jsx
- Frontend/src/Admin/Orders/RestaurantsOrder.jsx
- Frontend/src/Admin/RestaurantDetails/RestaurantDetailsPage.jsx
- Frontend/src/Admin/utils/UploadToCloudnary.js

### Customer Components
- Frontend/src/Customer/Analytics/CustomerAnalytics.jsx
- Frontend/src/customers/components/Address/AddressCard.jsx
- Frontend/src/customers/components/Address/NewAddressModal.jsx
- Frontend/src/customers/components/Footer/Footer.css
- Frontend/src/customers/components/Footer/Footer.jsx
- Frontend/src/customers/components/Login/Login.jsx
- Frontend/src/customers/components/MenuItem/MenuItemCard.jsx
- Frontend/src/customers/components/Navbar/Navbar.css
- Frontend/src/customers/components/Navbar/Navbar.jsx
- Frontend/src/customers/components/ProfileNavigation/ProfileNavigation.jsx
- Frontend/src/customers/components/Register/Register.jsx
- Frontend/src/customers/components/RestarentCard/Restaurant.css
- Frontend/src/customers/components/RestarentCard/RestaurantCard.jsx
- Frontend/src/customers/components/Search/Search.jsx

### Customer Pages
- Frontend/src/customers/pages/Auth/Auth.jsx
- Frontend/src/customers/pages/Auth/ResetPasswordForm.jsx
- Frontend/src/customers/pages/Auth/ResetPaswordRequest.jsx
- Frontend/src/customers/pages/Cart/Cart.jsx
- Frontend/src/customers/pages/Favorite/Favorite.jsx
- Frontend/src/customers/pages/Home/HomePage.css
- Frontend/src/customers/pages/Home/HomePage.jsx
- Frontend/src/customers/pages/MapTravel/MapTravel.jsx
- Frontend/src/customers/pages/MapTravel/api/travelAdvisorAPI.js
- Frontend/src/customers/pages/MapTravel/components/Header/Header.jsx
- Frontend/src/customers/pages/MapTravel/components/Map/Map.jsx
- Frontend/src/customers/pages/MapTravel/components/PlaceDetails/PlaceDetails.jsx
- Frontend/src/customers/pages/Profile/Profile.jsx
- Frontend/src/customers/pages/Restaurant/Restaurant.jsx

### SuperAdmin Components
- Frontend/src/SuperAdmin/Analytics/SuperAdminAnalytics.jsx
- Frontend/src/SuperAdmin/RestaurantRequest/RestaurantRequestTable.jsx
- Frontend/src/SuperAdmin/Restaurants/PendingRestaurantTable.jsx
- Frontend/src/SuperAdmin/Restaurants/RestaurantTable.jsx
- Frontend/src/SuperAdmin/Restaurants/SimplePendingTable.jsx
- Frontend/src/SuperAdmin/SuperAdmin.jsx
- Frontend/src/SuperAdmin/SuperAdminDashboard/SuperAdminDashboard.jsx
- Frontend/src/SuperAdmin/SuperAdminSideBar.jsx

### Data Files
- Frontend/src/Data/Demo.jsx
- Frontend/src/Data/restaurents.js
- Frontend/src/Data/topMeels.js

### Router Components
- Frontend/src/Routers/AdminRouters.jsx
- Frontend/src/Routers/CustomerRoutes.jsx
- Frontend/src/Routers/Routers.jsx

### Redux State Management
- Frontend/src/State/Admin/Ingredients/Action.js
- Frontend/src/State/Admin/Ingredients/ActionType.js
- Frontend/src/State/Admin/Order/ActionType.js
- Frontend/src/State/Admin/Order/restaurants.order.action.js
- Frontend/src/State/Admin/Order/restaurants.order.reducer.js
- Frontend/src/State/Analytics/analytics.reducer.js
- Frontend/src/State/Authentication/Reducer.js
- Frontend/src/State/Customers/Cart/ActionCreators.js
- Frontend/src/State/Customers/Cart/Reducer.js
- Frontend/src/State/Customers/Cart/cart.action.js
- Frontend/src/State/Customers/Menu/ActionCreators.js
- Frontend/src/State/Customers/Menu/ActionType.js
- Frontend/src/State/Customers/Menu/menu.action.js
- Frontend/src/State/Customers/Menu/Reducer.js
- Frontend/src/State/Customers/Orders/ActionCreators.js
- Frontend/src/State/Customers/Orders/ActionTypes.js
- Frontend/src/State/Customers/Orders/Action.js
- Frontend/src/State/Customers/Orders/Reducer.js
- Frontend/src/State/Customers/Restaurant/ActionCreateros.js
- Frontend/src/State/Customers/Restaurant/ActionTypes.js
- Frontend/src/State/Customers/Restaurant/Reducer.js
- Frontend/src/State/Customers/Restaurant/restaurant.action.js
- Frontend/src/State/Store/store.js
- Frontend/src/State/SuperAdmin/superAdmin.action.js
- Frontend/src/State/SuperAdmin/superAdmin.reducer.js

### Common Components
- Frontend/src/components/common/ErrorBoundary.jsx
- Frontend/src/components/common/ErrorDisplay.jsx
- Frontend/src/components/GlobalSpinner/GlobalSpinner.jsx

### Theme
- Frontend/src/theme/DarkTheme.js

## API Gateway Files
- api-gateway/src/main/java/com/foodOps/api_getway/GatewayConfig.java
- api-gateway/src/main/java/com/foodOps/api_getway/security/AppConfig.java

## Payment Service Files
- payment-service/HELP.md
- payment-service/pom.xml
- payment-service/src/main/java/com/foodOps/payment_service/controller/PaymentController.java

## Configuration Files
- docker-compose.yml
- flow.md
- README.md
- discovery-service/HELP.md
- discovery-service/pom.xml

## Summary
Total files with comments: 127 files
- Backend Java files: 16
- Frontend files: 95
- Configuration files: 16

This list excludes:
- node_modules directories
- target/build directories
- .metadata directories
- dist/build directories
- Binary files
- Generated files
