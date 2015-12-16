class Api::PostsController < ApplicationController

  def new

  end

  def index
    @posts = Post.all
  end

  def create
    @post = Post.new(post_params)

    @post.author_id = current_user.id
    @post.target_id = current_user.id


    if @post.save
      console.log("Saved!")
      redirect_to root_url
    else
      render json: @post.errors.full_messages, status: 422
    end
  end

    def show
      @post = Post.find(params[:id])
    end

    def destroy
     @post = Post.find(params[:id])
     @post.destroy
     render :show
    end

  private

  def post_params
    params.require(:post).permit(
      :body, :author_id, :target_id, :image_path, :link
    )
  end

end
