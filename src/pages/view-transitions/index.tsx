import { Link } from "@/components/core/Link";
import { Button } from "@/components/ui/button";
import ViewTransitionsDemo from "@/components/viewTransitions/demo";

const Page = () => {
	return (
		<div className="demo-box flex flex-col gap-4 lg:items-center">
			<h2 className="lg:mx-auto font-semibold text-xl">
				View Transitions
			</h2>
			<section className="pb-1 lg:text-center max-w-md text-balance flex flex-col gap-4">
				<div className="flex flex-col gap-1">
					To use the View Transitions API, you need to use the
					<code className="px-2 py-1 bg-accent-foreground lg:mx-auto">
						document.startViewTransition
					</code>
					function. Using this function, you need to swap out the page
					content for the next page and then you're done.
				</div>
				<div className="flex flex-col gap-1">
					Really?! That's it? Yes, that's it! The API will handle the
					rest for you. It will animate the transition between the
					pages and update the URL in the browser.
				</div>
				<div className="flex flex-col gap-1">
					You'll probably want to use this API in combination with
					some more advanced logic to also animate specific elements
					on the page. For example, you could use the
					<code className="px-2 py-1 bg-accent-foreground lg:mx-auto">
						view-transition-name
					</code>
					CSS attribute to animate specific elements on the page. With
					TailwindCSS you can inline this CSS attribute like this:
					<code className="px-2 py-1 bg-accent-foreground lg:mx-auto">
						&lt;div class="[view-transition-name=some_name]"&gt;
					</code>
					To read more about this, check out the MDN docs:{" "}
					<Link to="https://developer.mozilla.org/en-US/docs/Web/CSS/view-transition-name">
						view-transition-name
					</Link>
				</div>

				<div className="w-full flex items-center justify-center gap-6 flex-col pb-6 mb-1 border-b-2">
					<span>
						The buttons below give you a rough idea of how this
						would look like in any supported browser.
					</span>
					<ViewTransitionsDemo />
				</div>
			</section>
			<Button asChild className="w-max mx-auto">
				<Link to="/" className="block">
					Go back to home
				</Link>
			</Button>
		</div>
	);
};
export default Page;

export const getConfig = async () => {
	return {
		render: "static",
	};
};
