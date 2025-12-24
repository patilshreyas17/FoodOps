package com.foodOps.service;

import com.foodOps.Exceptions.RestaurantException;
import com.foodOps.dto.RestaurantDto;
import com.foodOps.model.Address;
import com.foodOps.model.Restaurant;
import com.foodOps.model.User;
import com.foodOps.repository.AddressRepository;
import com.foodOps.repository.RestaurantRepository;

import com.foodOps.repository.UserRepository;
import com.foodOps.request.CreateRestaurantRequest;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
@Transactional
@AllArgsConstructor
public class RestaurantServiceImpl implements RestaurantService{

    private final RestaurantRepository restaurantRepository;
    private  final AddressRepository addressRepository;
    private final UserService userService;
    private final UserRepository userRepository;

    @Override
    public Restaurant createRestaurant(CreateRestaurantRequest req, User user) {Address address=new Address();
        address.setCity(req.getAddress().getCity());
        address.setCountry(req.getAddress().getCountry());
        address.setFullName(req.getAddress().getFullName());
        address.setPostalCode(req.getAddress().getPostalCode());
        address.setState(req.getAddress().getState());
        address.setStreetAddress(req.getAddress().getStreetAddress());
        Address savedAddress = addressRepository.save(address);

        Restaurant restaurant = new Restaurant();

        restaurant.setAddress(savedAddress);
        restaurant.setContactInformation(req.getContactInformation());
        restaurant.setCuisineType(req.getCuisineType());
        restaurant.setDescription(req.getDescription());
        restaurant.setImages(req.getImages());
        restaurant.setName(req.getName());
        restaurant.setOpeningHours(req.getOpeningHours());
        restaurant.setRegistrationDate(req.getRegistrationDate());
        restaurant.setOwner(user);
        return restaurantRepository.save(restaurant);
    }

    @Override
    public Restaurant updateRestaurant(Long restaurantId, CreateRestaurantRequest updatedRestaurant) throws RestaurantException {
        Restaurant restaurant = findRestaurantById(restaurantId);
        if (restaurant.getCuisineType() != null) {
            restaurant.setCuisineType(updatedRestaurant.getCuisineType());
        }
        if (restaurant.getDescription() != null) {
            restaurant.setDescription(updatedRestaurant.getDescription());
        }
        return restaurantRepository.save(restaurant);

    }

    @Override
    public void deleteRestaurant(Long restaurantId) throws RestaurantException {

    }

    @Override
    public List<Restaurant> getAllRestaurant() {
        return restaurantRepository.findAll();
    }

    @Override
    public List<Restaurant> searchRestaurant(String keyword) {
        return restaurantRepository.findBySearchQuery(keyword);
    }

    @Override
    public Restaurant findRestaurantById(Long id) throws RestaurantException {
        Optional<Restaurant> restaurant = restaurantRepository.findById(id);
        if (restaurant.isPresent()) {
            return restaurant.get();
        } else {
            throw new RestaurantException("Restaurant with id " + id + "not found");
        }
    }

    @Override
    public Restaurant getRestaurantsByUserId(Long userId) throws RestaurantException {
        Restaurant restaurant=restaurantRepository.findByOwnerId(userId);
       if(restaurant==null){
              throw new RestaurantException("Restaurant with user id "+userId+" not found");
       }
        return restaurant;
    }

    @Override
    public RestaurantDto addToFavorites(Long restaurantId, User user) throws RestaurantException {
        Restaurant restaurant=findRestaurantById(restaurantId);

        RestaurantDto dto=new RestaurantDto();
        dto.setTitle(restaurant.getName());
        dto.setImages(restaurant.getImages());
        dto.setId(restaurant.getId());
        dto.setDescription(restaurant.getDescription());

        boolean isFavorited = false;
        List<RestaurantDto> favorites = user.getFavorites();
        for (RestaurantDto favorite : favorites) {
            if (favorite.getId().equals(restaurantId)) {
                isFavorited = true;
                break;
            }
        }

        if (isFavorited) {
            favorites.removeIf(favorite -> favorite.getId().equals(restaurantId));
        } else {
            favorites.add(dto);
        }

        userRepository.save(user);
        return dto;

    }

    @Override
    public Restaurant updateRestaurantStatus(Long id) throws RestaurantException {
        Restaurant restaurant=findRestaurantById(id);
        restaurant.setOpen(!restaurant.isOpen());
        return restaurantRepository.save(restaurant);
    }

}
