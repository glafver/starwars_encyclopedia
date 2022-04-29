import { Image } from "react-bootstrap"
import home_page_image from '../assets/images/home_page_picture.png'

const HomePage = () => {
	return (
		<>
			<h1>Welcome to <span className="StarWars">Star Wars</span>  Encyclopedia!</h1>
			<p>Here you can read more about films and characters. Just choose what do you want to find in the navigation bar.</p>
			<Image fluid src={home_page_image} className='col-6'></Image>
		</>
	)
}

export default HomePage

