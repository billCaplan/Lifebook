class Api::PostsController < ApplicationController

  def new

  end

  def create
    @post = Post.new(post_params)

    if @post.save
      render :show
    else
      render json: @post.errors.full_messages, status: 422
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
