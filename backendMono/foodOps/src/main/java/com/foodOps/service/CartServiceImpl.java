package com.foodOps.service;

import java.util.Optional;

import com.foodOps.service.CartService;
import com.foodOps.service.UserService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.foodOps.Exceptions.CartException;
import com.foodOps.Exceptions.CartItemException;
import com.foodOps.Exceptions.FoodException;
import com.foodOps.Exceptions.UserException;
import com.foodOps.model.Cart;
import com.foodOps.model.CartItem;
import com.foodOps.model.Food;
import com.foodOps.model.User;
import com.foodOps.repository.CartItemRepository;
import com.foodOps.repository.CartRepository;
import com.foodOps.repository.foodRepository;
import com.foodOps.request.AddCartItemRequest;
import com.foodOps.request.UpdateCartItemRequest;

@Service
@Transactional
@AllArgsConstructor
public class CartServiceImpl implements CartService {

    private CartRepository cartRepository;

    private UserService userService;

    private CartItemRepository cartItemRepository;

    private foodRepository menuItemRepository;

    @Override
    public CartItem addItemToCart(AddCartItemRequest req, String jwt) throws UserException, FoodException, CartException, CartItemException {

        User user = userService.findUserProfileByJwt(jwt);

        Optional<Food> menuItem=menuItemRepository.findById(req.getMenuItemId());
        if(menuItem.isEmpty()) {
            throw new FoodException("Menu Item not exist with id "+req.getMenuItemId());
        }

        Cart cart = findCartByUserId(user.getId());

        for (CartItem cartItem : cart.getItems()) {
            if (cartItem.getFood().equals(menuItem.get())) {

                int newQuantity = cartItem.getQuantity() + req.getQuantity();
                return updateCartItemQuantity(cartItem.getId(),newQuantity);
            }
        }

        CartItem newCartItem = new CartItem();
        newCartItem.setFood(menuItem.get());
        newCartItem.setQuantity(req.getQuantity());
        newCartItem.setCart(cart);
        newCartItem.setIngredients(req.getIngredients());
        newCartItem.setTotalPrice(req.getQuantity()*menuItem.get().getPrice());

        CartItem savedItem=cartItemRepository.save(newCartItem);
        cart.getItems().add(savedItem);
        cartRepository.save(cart);

        return savedItem;

    }

    @Override
    public CartItem updateCartItemQuantity(Long cartItemId,int quantity) throws CartItemException {
        Optional<CartItem> cartItem=cartItemRepository.findById(cartItemId);
        if(cartItem.isEmpty()) {
            throw new CartItemException("cart item not exist with id "+cartItemId);
        }
        cartItem.get().setQuantity(quantity);
        cartItem.get().setTotalPrice((cartItem.get().getFood().getPrice()*quantity));
        return cartItemRepository.save(cartItem.get());
    }

    @Override
    public Cart removeItemFromCart(Long cartItemId, String jwt) throws UserException,
            CartException, CartItemException {

        User user = userService.findUserProfileByJwt(jwt);

        Cart cart = findCartByUserId(user.getId());

        Optional<CartItem> cartItem=cartItemRepository.findById(cartItemId);

        if(cartItem.isEmpty()) {
            throw new CartItemException("cart item not exist with id "+cartItemId);
        }

        cart.getItems().remove(cartItem.get());
        return cartRepository.save(cart);
    }

    @Override
    public Long calculateCartTotals(Cart cart) throws UserException {

        Long total = 0L;
        for (CartItem cartItem : cart.getItems()) {
            total += cartItem.getFood().getPrice() * cartItem.getQuantity();
        }
        return total;
    }

    @Override
    public Cart findCartById(Long id) throws CartException {
        Optional<Cart> cart = cartRepository.findById(id);
        if(cart.isPresent()) {
            return cart.get();
        }
        throw new CartException("Cart not found with the id "+id);
    }

    @Override
    public Cart findCartByUserId(Long userId) throws CartException, UserException {

        Optional<Cart> opt=cartRepository.findByCustomer_Id(userId);

        if(opt.isPresent()) {
            return opt.get();
        }
        throw new CartException("cart not found");

    }

    @Override
    public Cart clearCart(Long userId) throws CartException, UserException {
        Cart cart=findCartByUserId(userId);

        cart.getItems().clear();
        return cartRepository.save(cart);
    }



}
