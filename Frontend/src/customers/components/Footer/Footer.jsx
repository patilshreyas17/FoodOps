import React from "react";
import { Box, Container, Grid, Typography, Link, IconButton, Divider } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import "./Footer.css";

const Footer = () => {
  return (
    <Box className="footer-container">
      <Container maxWidth="xl">
        <Grid container spacing={4} className="footer-content">
          {/* About Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" className="footer-title">
              Food Ops
            </Typography>
            <Typography variant="body2" className="footer-description">
              Your trusted food delivery partner, bringing delicious meals from your favorite restaurants right to your doorstep. Quality, speed, and satisfaction guaranteed.
            </Typography>
            <Box className="social-icons">
              <IconButton className="social-icon" aria-label="Facebook">
                <FacebookIcon />
              </IconButton>
              <IconButton className="social-icon" aria-label="Twitter">
                <TwitterIcon />
              </IconButton>
              <IconButton className="social-icon" aria-label="Instagram">
                <InstagramIcon />
              </IconButton>
              <IconButton className="social-icon" aria-label="LinkedIn">
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" className="footer-title">
              Quick Links
            </Typography>
            <Box className="footer-links">
              <Link href="/" className="footer-link">Home</Link>
              <Link href="/search" className="footer-link">Search Food</Link>
              <Link href="/cart" className="footer-link">Cart</Link>
              <Link href="/my-profile" className="footer-link">My Profile</Link>
              <Link href="/map-travel" className="footer-link">Restaurant Map</Link>
            </Box>
          </Grid>

          {/* Services */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" className="footer-title">
              Services
            </Typography>
            <Box className="footer-links">
              <Link href="#" className="footer-link">Food Delivery</Link>
              <Link href="#" className="footer-link">Restaurant Partners</Link>
              <Link href="#" className="footer-link">Corporate Orders</Link>
              <Link href="#" className="footer-link">Gift Cards</Link>
              <Link href="#" className="footer-link">Customer Support</Link>
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" className="footer-title">
              Contact Us
            </Typography>
            <Box className="contact-info">
              <Box className="contact-item">
                <PhoneIcon className="contact-icon" />
                <Typography variant="body2">+91 23467 8900</Typography>
              </Box>
              <Box className="contact-item">
                <EmailIcon className="contact-icon" />
                <Typography variant="body2">foodops11@gmail.com</Typography>
              </Box>
              <Box className="contact-item">
                <LocationOnIcon className="contact-icon" />
                <Typography variant="body2">Pune, Maharashtra</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider className="footer-divider" />

        {/* Bottom Section */}
        <Box className="footer-bottom">
          <Typography variant="body2" className="copyright">
            © {new Date().getFullYear()} Food Ops. All rights reserved.
          </Typography>
          <Box className="bottom-links">
            <Link href="#" className="footer-link">Privacy Policy</Link>
            <Link href="#" className="footer-link">Terms of Service</Link>
            <Link href="#" className="footer-link">Cookie Policy</Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
