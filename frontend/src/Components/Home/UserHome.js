import "../../Css/Home/UserHome.css";
import Accordion from '../Accordion/Accordion'
import Button from '@mui/material/Button';

const UserHome = () => {
    
    return ( <>
        <div className="home-header">
            <div className="home-header-wrap-wrapper">
                <div className="home-header-wrapper">
                    <div className="home-header-title"> <p> Lorem ipsum dolor sit amet.</p></div>
                    <div className="home-header-desc"> <p> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam doloremque modi quisquam perferendis, voluptatibus nulla.</p></div>
                    <div className="home-header-button"> 
						<Button variant="contained"> Get Therapists </Button>
					</div>
                </div>
            </div>
        </div>
        <div className="home-body">
            <div className="home-body-wrapper">
                <div className="home-body-title"> 
                    <p> What our online therapists can help you with </p>
                </div>
                <div className="home-body-desc"> 
                    <div className="home-body-desc-left">
                         <p> 1 </p>
                         <p> 2 </p>
                         <p> 3 </p>
                         <p> 4 </p>
                    </div> 
                    <div className="home-body-desc-right">
                         <p> 5 </p>
                         <p> 6 </p>
                         <p> 7 </p>
                         <p> 8 </p>
                    </div>
                </div>
                <div className="home-body-footer"> 
                    <div className="home-body-footer-title">
                        <p> Did you know?</p>
                    </div>
                    <div className="home-body-footer-desc">
                        <p> 
                            You can access Teladoc virtual counseling whether you have insurance or not.
                            Therapy visits are $0-119. Psychiatry visits are $0-299.*
                            Set up your account to see your discounted pricing.
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div className="home-body-pricing">
            <div className="home-body-pricing-wrapper">
            <section className="py-20 dark:bg-gray-100 dark:text-gray-800">
	<div className="container px-4 mx-auto">
		<div className="max-w-2xl mx-auto mb-16 text-center">
			<span className="font-bold tracking-wider uppercase dark:text-violet-600">Pricing</span>
			<h2 className="text-4xl font-bold lg:text-5xl">Choose your best plan</h2>
		</div>
		<div className="flex flex-wrap items-stretch -mx-4">
			<div className="flex w-full mb-8 sm:px-4 md:w-1/2 lg:w-1/3 lg:mb-0">
				<div className="flex flex-grow flex-col p-6 space-y-6 rounded shadow sm:p-8 dark:bg-gray-50">
					<div className="space-y-2">
						<h4 className="text-2xl font-bold">Beginner</h4>
						<span className="text-6xl font-bold">Free</span>
					</div>
					<p className="mt-3 leading-relaxed dark:text-gray-600">Etiam ac convallis enim, eget euismod dolor.</p>
					<ul className="flex-1 mb-6 dark:text-gray-600">
						<li className="flex mb-2 space-x-2">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6 dark:text-violet-600">
								<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
							</svg>
							<span>Aenean quis</span>
						</li>
						<li className="flex mb-2 space-x-2">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6 dark:text-violet-600">
								<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
							</svg>
							<span>Morbi semper</span>
						</li>
						<li className="flex mb-2 space-x-2">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6 dark:text-violet-600">
								<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
							</svg>
							<span>Tristique enim nec</span>
						</li>
					</ul>
					<button type="button" className="inline-block px-5 py-3 font-semibold tracking-wider text-center rounded dark:bg-violet-600 dark:text-gray-50">Get Started</button>
				</div>
			</div>
			<div className="flex w-full mb-8 sm:px-4 md:w-1/2 lg:w-1/3 lg:mb-0">
				<div className="flex flex-grow flex-col p-6 space-y-6 rounded shadow sm:p-8 dark:bg-violet-600 dark:text-gray-50">
					<div className="space-y-2">
						<h4 className="text-2xl font-bold">Pro</h4>
						<span className="text-6xl font-bold">$24
							<span className="text-sm tracking-wide">/month</span>
						</span>
					</div>
					<p className="leading-relaxed">Morbi cursus ut sapien sit amet consectetur.</p>
					<ul className="flex-1 space-y-2">
						<li className="flex items-center space-x-2">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6">
								<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
							</svg>
							<span>Everything in Free</span>
						</li>
						<li className="flex items-center space-x-2">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6">
								<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
							</svg>
							<span>Phasellus tellus</span>
						</li>
						<li className="flex items-center space-x-2">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6">
								<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
							</svg>
							<span>Praesent faucibus</span>
						</li>
						<li className="flex items-center space-x-2">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6">
								<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
							</svg>
							<span>Aenean et lectus blandit</span>
						</li>
					</ul>
					<a rel="noopener noreferrer" href="#" className="inline-block w-full px-5 py-3 font-bold tracking-wider text-center rounded dark:bg-gray-100 dark:text-violet-600">Get Started</a>
				</div>
			</div>
			<div className="flex w-full mb-8 sm:px-4 md:w-1/2 lg:w-1/3 lg:mb-0">
				<div className="flex flex-grow flex-col p-6 space-y-6 rounded shadow sm:p-8 dark:bg-gray-50">
					<div className="space-y-2">
						<h4 className="text-2xl font-bold">Team</h4>
						<span className="text-6xl font-bold">$72
							<span className="text-sm tracking-wide">/month</span>
						</span>
					</div>
					<p className="leading-relaxed dark:text-gray-600">Phasellus ultrices bibendum nibh in vehicula.</p>
					<ul className="space-y-2 dark:text-gray-600">
						<li className="flex items-start space-x-2">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6 dark:text-violet-600">
								<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
							</svg>
							<span>Everything in Pro</span>
						</li>
						<li className="flex items-start space-x-2">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6 dark:text-violet-600">
								<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
							</svg>
							<span>Fusce sem ligula</span>
						</li>
						<li className="flex items-start space-x-2">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6 dark:text-violet-600">
								<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
							</svg>
							<span>Curabitur dictum</span>
						</li>
						<li className="flex items-start space-x-2">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6 dark:text-violet-600">
								<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
							</svg>
							<span>Duis odio eros</span>
						</li>
						<li className="flex items-start space-x-2">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6 dark:text-violet-600">
								<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
							</svg>
							<span>Vivamus ut lectus ex</span>
						</li>
					</ul>
					<a rel="noopener noreferrer" href="#" className="inline-block w-full px-5 py-3 font-semibold tracking-wider text-center rounded dark:bg-violet-600 dark:text-gray-50">Get Started</a>
				</div>
			</div>
		</div>
	</div>
</section>
            </div>
        </div>
        <div className="home-body-faq">
            <div className="home-body-faq-wrapper">
                <div className="home-body-faq-title"> 
                    <p> Online mental health FAQs </p>
                </div>
                <div className="home-body-faq-accordion">
					<Accordion />
                </div>
            </div>
        </div>
        <div className="home-body-medcenters">

        </div>
    </> );
}
 
export default UserHome;