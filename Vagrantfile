Vagrant.configure(2) do |config|
  
  config.vm.box = "puppetlabs/centos-7.0-64-puppet"
  config.vm.synced_folder "../src", "/dados/src", owner: "vagrant", group: "vagrant"

  config.vm.define :yo_angular do | yo |
    yo.vm.hostname = "yo-angular"
    #yo.vm.provision "puppet" do |puppet|
    #  puppet.module_path = "modules"
    #  puppet.manifest_file = "yo_angular.pp"
    #end
    yo.vm.network "forwarded_port", guest: 80, host: 30000
    
  end
end

