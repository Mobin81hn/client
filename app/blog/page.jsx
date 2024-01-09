import BlogPageComp from "@/components/blogPageComp";

const BlogPage = ({searchParams}) => {
    return ( 
        <div className="container mx-auto my-12">
            <BlogPageComp url={searchParams}/>
        </div>
     );
}
 
export default BlogPage;